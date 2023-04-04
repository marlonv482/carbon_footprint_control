import { IUnit } from '../../interfaces/unit.interface';
import { BaseEntity } from '../../config/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ResourcesEntity } from '../../resources/entities/resource.entity';


@Entity({name:'units'})
export class UnitsEntity extends BaseEntity implements IUnit{
    @Column()
    unit:string;

    @OneToMany(()=>ResourcesEntity,(resource)=>resource.unit)
    resource:ResourcesEntity
}