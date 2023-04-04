import { Global, Module } from '@nestjs/common';
import { ResourcesService } from './services/resources.service';
import { ResourcesController } from './controllers/resources.controller';
import { ResourcesEntity } from './entities/resource.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsService } from 'src/units/services/units.service';
import { UnitsEntity } from 'src/units/entities/unit.entity';

@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([ResourcesEntity,UnitsEntity]),
    
  ],
  providers: [ResourcesService,UnitsService],
  controllers: [ResourcesController],
  exports:[TypeOrmModule,ResourcesService]

})
export class ResourcesModule {}
