import { Global, Module } from '@nestjs/common';
import { EmisionsService } from './services/emisions.service';
import { EmisionsController } from './controllers/emisions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmisionsEntity } from './entities/emisions.entity';
@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([EmisionsEntity])
  ],
  providers: [EmisionsService, ],
  controllers: [EmisionsController, ],
  exports:[EmisionsService,TypeOrmModule]
})
export class EmisionsModule {}
