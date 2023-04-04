import { FrecuenciesEntity } from "../../frequencies/entities/frecuency.entity";
import { BaseEntity } from "../../config/base.entity";
import { IActivities } from "../../interfaces/activities.interface";
import { ResourcesEntity } from "../../resources/entities/resource.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { EmisionsEntity } from "../../emisions/entities/emisions.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { ConsumptionEntity } from "../../consumption/entities/consumption.entity";

@Entity({name:'activities'})
export class ActivitiesEntity extends BaseEntity implements IActivities{
    @Column()
    activity_description: string;
    
   
  @ManyToOne(() => ResourcesEntity, resources => resources.activity)
  resource: ResourcesEntity;

  @ManyToOne(() => FrecuenciesEntity, frecuency => frecuency.activity)
  frecuency: FrecuenciesEntity;

  @ManyToOne(() => EmisionsEntity, emision => emision.activity)
  emision: EmisionsEntity;

  @ManyToOne(() => CategoriesEntity, category => category.activity)
  category: CategoriesEntity;

  @OneToMany(() => ConsumptionEntity, consumption => consumption.activity)
  consumption: ConsumptionEntity;
  
}