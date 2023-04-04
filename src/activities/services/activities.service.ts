import { Injectable } from '@nestjs/common';
import { ActivityDTO } from '../dto/activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivitiesEntity } from '../entities/antitities.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { ResourcesEntity } from 'src/resources/entities/resource.entity';
import { ResourcesService } from 'src/resources/services/resources.service';
import { FrecuenciesEntity } from 'src/frequencies/entities/frecuency.entity';
import { EmisionsEntity } from 'src/emisions/entities/emisions.entity';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';
import { FrequenciesService } from 'src/frequencies/services/frequencies.service';
import { CategoriesService } from 'src/categories/services/categories.service';
import { EmisionsService } from 'src/emisions/services/emisions.service';
import { Activities } from 'src/constants/activities';

@Injectable()
export class ActivitiesService {
   
 
  constructor(
    @InjectRepository(ActivitiesEntity)
    private readonly activitiesRepository: Repository<ActivitiesEntity>,
    private readonly resourcesService: ResourcesService,
    private readonly frequenciesService: FrequenciesService,
    private readonly categoriesService: CategoriesService,
    private readonly emisionsService: EmisionsService,
  ) {}

 public async getActivityById(id: string): Promise<ActivitiesEntity> {
    try {
      const activity: ActivitiesEntity = await this.activitiesRepository
        .createQueryBuilder('resource')
        .where({ id })
        .leftJoinAndSelect('activity.frecuency','frecuency')
        .leftJoinAndSelect('activity.emision','emision')
        .leftJoinAndSelect('activity.category','category')
        .leftJoinAndSelect('activity.resource','resource')
        .leftJoinAndSelect('resource.unit','unit')
        .getOne();
      if (!activity) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el id',
        });
      }
      return activity;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getActivityByResource(_resource: string):Promise<ActivitiesEntity[]> {
    try{
     const resource:ResourcesEntity=await this.resourcesService.getResourceByName(_resource)
     const activity: ActivitiesEntity[] = await this.activitiesRepository
        .createQueryBuilder('activity')
        .where('activity.resource = :resource', { resource: resource.id })
        .getMany();
      
     if (!activity) {
       throw new ErrorManager({
         type: 'BAD_REQUEST',
         message: 'No se encontro la actividad con el recurso '+_resource,
       });
     }
     return activity;
   } catch (error) {
     throw ErrorManager.createSignatureError(error.message);
   
    }
 }
  updateActivity(_activity: ActivityDTO, id: string) {
    throw new Error('Method not implemented.');
  }

  async deleteActivity(id: string): Promise<DeleteResult> {
    try {
      const activity: DeleteResult = await this.activitiesRepository.delete(id);
      if (activity.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return activity;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getAllActivities(): Promise<ActivitiesEntity[]> {
    try {
      const activities: ActivitiesEntity[] =
        await this.activitiesRepository.find();
      if (activities.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return activities;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getActivityByName(_activity: string) : Promise<ActivitiesEntity> {
    try {
      const activity: ActivitiesEntity = await this.activitiesRepository
        .createQueryBuilder('activity')
        .where('activity.activity_description = :activity', { activity: _activity })
        .leftJoinAndSelect('activity.frecuency','frecuency')
        .leftJoinAndSelect('activity.emision','emision')
        .leftJoinAndSelect('activity.category','category')
        .leftJoinAndSelect('activity.resource','resource')
        .leftJoinAndSelect('resource.unit','unit')
        .getOne();
      if (!activity) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el Recurso',
        });
      }
      return activity;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async insertDefaultActivities(): Promise<any> {
    try {
      const activities: ActivitiesEntity[] = await this.activitiesRepository.find();
      if (activities.length > 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya hay actividades creados',
        });
      }
      Activities.forEach(async (activity) => {
        await this.createActivity(activity);
      });
      return { message: 'Registros insertados correctamente' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async createActivity(
    _activity: ActivityDTO,
  ): Promise<ActivitiesEntity> {
    try {
      const resource: ResourcesEntity =
        await this.resourcesService.getResourceByName(_activity.resource);
      const frecuency: FrecuenciesEntity =
        await this.frequenciesService.getFrecuencyByName(_activity.frecuency);
      const emision: EmisionsEntity =
        await this.emisionsService.getEmisionByName(_activity.emision);
      const category: CategoriesEntity =
        await this.categoriesService.getCateoryByName(_activity.category);
        
      const activity: ActivitiesEntity = await this.activitiesRepository.save({
        activity_description: _activity.activity_description,
        resource,
        frecuency,
        emision,
        category,
      });
      return activity;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
