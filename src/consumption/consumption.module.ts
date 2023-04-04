import { Module } from '@nestjs/common';
import { ConsumptionController } from './controllers/consumption.controller';
import { ConsumptionService } from './services/consumption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesEntity } from 'src/activities/entities/antitities.entity';
import { ConsumptionEntity } from './entities/consumption.entity';
import { ActivitiesService } from 'src/activities/services/activities.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionEntity,ActivitiesEntity ])],
  controllers: [ConsumptionController],
  providers: [ConsumptionService, ActivitiesService],
})
export class ConsumptionModule {}
