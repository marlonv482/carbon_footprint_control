import { Global, Module } from '@nestjs/common';
import { UnitsService } from './services/units.service';
import { UnitsController } from './controllers/units.controller';
import { UnitsEntity } from './entities/unit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([UnitsEntity])
  ],
  providers: [UnitsService],
  controllers: [UnitsController],
 
  exports:[UnitsService,TypeOrmModule]
})
export class UnitsModule {}
