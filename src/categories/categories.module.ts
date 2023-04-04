import { Global, Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/categories.entity';
@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports:[TypeOrmModule,CategoriesService]
})
export class CategoriesModule {}
