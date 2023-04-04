import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, JoinColumn, OneToMany } from 'typeorm';
import { ActivitiesEntity } from '../../activities/entities/antitities.entity';
import { ICategories } from '../../interfaces/categories.interface';


@Entity({name:'categories'})
export class CategoriesEntity extends BaseEntity implements ICategories{
    @Column()
    category:string;

    @OneToMany(()=>ActivitiesEntity,(activities)=>activities.category)
    @JoinColumn({name:"activityId"})
    activity:ActivitiesEntity
}