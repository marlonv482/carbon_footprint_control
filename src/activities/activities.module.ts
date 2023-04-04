import { Global, Module } from '@nestjs/common';
import { ActivitiesService } from './services/activities.service';
import { ActivitiesController } from './controllers/activities.controller';
import { ActivitiesEntity } from './entities/antitities.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from 'src/resources/services/resources.service';
import { ResourcesEntity } from 'src/resources/entities/resource.entity';
import { CategoriesService } from 'src/categories/services/categories.service';
import { EmisionsService } from 'src/emisions/services/emisions.service';
import { FrequenciesService } from 'src/frequencies/services/frequencies.service';
import { FrecuenciesEntity } from 'src/frequencies/entities/frecuency.entity';
import { EmisionsEntity } from 'src/emisions/entities/emisions.entity';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivitiesEntity,
      ResourcesEntity,
      FrecuenciesEntity,
      EmisionsEntity,
      CategoriesEntity,
    ]),
  ],
  exports:[TypeOrmModule,ActivitiesService],
  providers: [
    ActivitiesService,
    ResourcesService,
    CategoriesService,
    EmisionsService,
    FrequenciesService,
  ],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
