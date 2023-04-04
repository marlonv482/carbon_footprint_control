import { Global, Module } from '@nestjs/common';
import { FrequenciesService } from './services/frequencies.service';
import { FrequenciesController } from './controllers/frequencies.controller';
import { FrecuenciesEntity } from './entities/frecuency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([FrecuenciesEntity])
  ],
  providers: [ FrequenciesService],
  controllers: [ FrequenciesController],
  exports:[TypeOrmModule,FrequenciesService]
})
export class FrequenciesModule {}
