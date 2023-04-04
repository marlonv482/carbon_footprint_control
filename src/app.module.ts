import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { ConfigModule } from '@nestjs/config';
import { EmisionsModule } from './emisions/emisions.module';
import { FrequenciesModule } from './frequencies/frequencies.module';
import { ResourcesModule } from './resources/resources.module';
import { UnitsModule } from './units/units.module';
import { CategoriesModule } from './categories/categories.module';
import { ActivitiesModule } from './activities/activities.module';
import { ConsumptionModule } from './consumption/consumption.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    EmisionsModule,
    FrequenciesModule,
    ResourcesModule,
    UnitsModule,
    CategoriesModule,
    ActivitiesModule,
    ConsumptionModule,
  ],
  exports:[]
 
})
export class AppModule {}
