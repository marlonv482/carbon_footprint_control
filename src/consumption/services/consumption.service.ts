import { Injectable } from '@nestjs/common';
import { ConsumptionTDO } from '../dto/consumption.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionEntity } from '../entities/consumption.entity';
import { Repository } from 'typeorm';
import { ActivitiesService } from 'src/activities/services/activities.service';
import { ErrorManager } from 'src/utils/errors.manager';
import { ActivitiesEntity } from 'src/activities/entities/antitities.entity';

@Injectable()
export class ConsumptionService {
  public async getAverageTrips() {
    try {
      const antivities: ActivitiesEntity[] =
        await this.activitiesService.getActivityByResource('Viajes');
      const averageTrips: Array<any> = [];
      antivities.forEach(async (activity: ActivitiesEntity) => {
        const average = this.getAverageByActivity(activity);
        averageTrips.push({
          activity,
          average,
        });
      });

      return averageTrips;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private async getAverageByActivity(activity): Promise<number> {
    try {
      const consumption: ConsumptionEntity[] = await this.consumptionRepository
        .createQueryBuilder('consumption')
        .where('consumption.activity = :activity', { activity: activity.id })
        .getMany();
      return this.getConsumptionAverage(consumption);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async monthWithLessRefrigerantloss(): Promise<any> {
    try {
      const antivity: ActivitiesEntity[] =
        await this.activitiesService.getActivityByResource('Refrigerante');
      const consumption: ConsumptionEntity[] = await this.consumptionRepository
        .createQueryBuilder('consumption')
        .where('consumption.activity = :activity', { activity: antivity[0].id })
        .getMany();

      const consumptionWithLessLoss =
        this.getConsumptionWithLessLoss(consumption);
      const month = this.getMonthOfDate(consumptionWithLessLoss.date);
      return { mes: month, cantidad: consumptionWithLessLoss.amount };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }


  constructor(
    @InjectRepository(ConsumptionEntity)
    private readonly consumptionRepository: Repository<ConsumptionEntity>,
    private readonly activitiesService: ActivitiesService,
  ) {}

  public async createConsumptionByResource(
    _consumption: ConsumptionTDO,
    resource: string,
  ): Promise<ConsumptionEntity> {
    try {
      const activity: ActivitiesEntity =
        await this.activitiesService.getActivityByName(_consumption.activity);
      this.isValidActivity(activity, resource);

      const _date = new Date(_consumption.date);
      this.isValidDate(_date);

      const date = _date.toISOString();
      return await this.saveConsumption({
        amount: _consumption.amount,
        activity,
        date,
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private isValidActivity(activity: ActivitiesEntity, resource: string) {
    if (activity.resource.resource !== resource) {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: `La Actividad no es de ${resource}`,
      });
    }
  }

  private async saveConsumption(_consumption: any) {
    try {
      return await this.consumptionRepository.save(_consumption);
    } catch (error) {}
    return await this.consumptionRepository.save(_consumption);
  }
  private isValidDate(date: Date) {
    if (date.toString() === 'Invalid Date') {
      throw new ErrorManager({
        type: 'BAD_REQUEST',
        message: 'Fecha invalidad',
      });
    }
  }

  private getAmountDaysInMont(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayNextMonth = new Date(year, month + 1, 1);
    const lastDayCurrentMonth = new Date(
      firstDayNextMonth.getTime() - 86400000,
    );
    return lastDayCurrentMonth.getDate();
  }
  private getMonthOfDate(_date: string): string {
    const date = new Date(_date);
    const options = { month: 'long' };
    return new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(date);
  }

  private getConsumptionWithLessLoss(_consumption: ConsumptionEntity[]) {
    return _consumption.reduce((accumulator, element) => {
      return element.amount < accumulator.amount ? element : accumulator;
    });
  }
  private getConsumptionAverage(consumption: ConsumptionEntity[]): number {
    const total = consumption.reduce(
      (sum, _consumption) => sum + _consumption.amount,
      0,
    );
    return total / consumption.length;
  }
}
