import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { ActivitiesEntity } from '../../activities/entities/antitities.entity';
import { IEmisions } from '../../interfaces/emisions.interface';


@Entity({name:'emisions'})
export class EmisionsEntity extends BaseEntity implements IEmisions{
    @Column()
    emision:string;

    @OneToMany(()=>ActivitiesEntity,(activities)=>activities.emision)
    @JoinColumn({name:"activityId"})
    activity:ActivitiesEntity
}