import { BaseEntity } from '../../config/base.entity';
import { Entity, Column,  ManyToOne } from 'typeorm';
import { ActivitiesEntity } from '../../activities/entities/antitities.entity';
import { IConsumption } from '../../interfaces/consumption.interface';


@Entity({name:'consumption'})
export class ConsumptionEntity extends BaseEntity implements IConsumption{
    @Column()
    date:string;

    @Column()
    amount:number;

    @ManyToOne(() => ActivitiesEntity, activity => activity.consumption)
    activity: ActivitiesEntity;  
}