import { CategoryDTO } from './../dto/category.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
    constructor(private readonly categoriesService:CategoriesService){

    }

    @Post('createCategory')
    public async createCategory(@Body() category:CategoryDTO){
        return await this.categoriesService.createCategory(category);
    }

    @Get('getAllCategories')
    public async getAllCategories(){
        return await this.categoriesService.getAllCategories();
    }

    @Get('getCateoryById/:categoryId')
    public async getCateoryById(@Param('categoryId') categoryId:string){
        return await this.categoriesService.getCateoryById(categoryId);
    }

    @Get('getCateoryByName/:category')
    public async getCateoryByName(@Param('category') _category:string){
        return await this.categoriesService.getCateoryByName(_category);
    }

    @Delete("deleteCategory/:categoryId")
    public async deleteCategory(@Param('categoryId') categoryId:string){
        return await this.categoriesService.deleteCategory(categoryId)
    }

    @Put("updateCategory/:categoryId")
    public async updateCategory(@Body() category:CategoryDTO,@Param('categoryId') categoryId:string){
        return await this.categoriesService.updateCategory(category,categoryId)
    }

    @Get('insertDefaultCategories')
    public async insertDefaultCategories(){
        return await this.categoriesService.insertDefaultCategories();
    }
}
