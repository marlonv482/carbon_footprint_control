import { Resources } from './../../constants/resources';
import { Injectable } from '@nestjs/common';
import { ResourcesDTO, ResourcesUpdateDTO } from '../dto/resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourcesEntity } from '../entities/resource.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { UnitsService } from 'src/units/services/units.service';
import { UnitsEntity } from 'src/units/entities/unit.entity';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourcesEntity)
    private readonly resourceRepository: Repository<ResourcesEntity>,
    private readonly unitService: UnitsService,
  ) {}

  async updateResource(
    resource: ResourcesUpdateDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const _resource: UpdateResult = await this.resourceRepository.update(
        id,
         resource,
      );
      if (_resource.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return _resource;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async deleteResource(id: string): Promise<DeleteResult> {
    try {
      const resource: DeleteResult = await this.resourceRepository.delete(id);
      if (resource.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return resource;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getAllResources(): Promise<ResourcesEntity[]> {
    try {
      const resources: ResourcesEntity[] = await this.resourceRepository.find();
      if (resources.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return resources;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getResourceById(id: string): Promise<ResourcesEntity> {
    try {
      const resource: ResourcesEntity = await this.resourceRepository
        .createQueryBuilder('resource')
        .where({ id })
        .leftJoinAndSelect('resource.unit','unit')
        .getOne();
      if (!resource) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el id',
        });
      }
      return resource;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getResourceByName(_resource: string): Promise<ResourcesEntity> {
    try {
      const resource: ResourcesEntity = await this.resourceRepository
        .createQueryBuilder('resource')
        .where('resource.resource = :resource', { resource: _resource })
        .leftJoinAndSelect('resource.unit','unit')
        .getOne();
      if (!resource) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el Recurso',
        });
      }
      return resource;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async createResource(body: ResourcesDTO): Promise<ResourcesEntity> {
    try {
      
      const unit: UnitsEntity = await this.unitService.getUnitByName(body.unit);
      if(unit===undefined){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro la unidad',
        });
      }
      console.log(unit)
      const resource:ResourcesEntity= await this.resourceRepository.save({
        resource: body.resource,
        unit,
      });
      return resource
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async insertDefaultResources(): Promise<any> {
    try {
      const resources: ResourcesEntity[] = await this.resourceRepository.find();
      if (resources.length > 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya hay recursos creados',
        });
      }
      Resources.forEach(async (resource) => {
        await this.createResource(resource);
      });
      return { message: 'Registros insertados correctamente' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
