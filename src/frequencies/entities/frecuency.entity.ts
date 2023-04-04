import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { ActivitiesEntity } from '../../activities/entities/antitities.entity';
import { IFrecuencies } from '../../interfaces/frecuencies.interface';


@Entity({name:'frecuencies'})
export class FrecuenciesEntity extends BaseEntity implements IFrecuencies{
    @Column()
    frecuency:string;

    @OneToMany(()=>ActivitiesEntity,(activities)=>activities.frecuency)
    @JoinColumn({name:"activityId"})
    activity:ActivitiesEntity
}