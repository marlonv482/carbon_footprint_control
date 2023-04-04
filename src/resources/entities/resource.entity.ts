import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ActivitiesEntity } from '../../activities/entities/antitities.entity';
import { IResource } from '../../interfaces/resources.interface';
import { UnitsEntity } from '../../units/entities/unit.entity';


@Entity({name:'resources'})
export class ResourcesEntity extends BaseEntity implements IResource{
    @Column()
    resource:string;

    @Column({
        nullable: true,
    })
    derivative:string;

    @ManyToOne(() => UnitsEntity, units => units.resource)
    unit: UnitsEntity;

    @OneToMany(()=>ActivitiesEntity,(activities)=>activities.resource)
    @JoinColumn({name:"activityId"})
    activity:ActivitiesEntity

  
}