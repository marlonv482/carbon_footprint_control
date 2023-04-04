import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResourcesService } from '../services/resources.service';
import { ResourcesDTO, ResourcesUpdateDTO } from '../dto/resource.dto';

@Controller('resources')
@ApiTags('Resources')
export class ResourcesController {
    constructor(private readonly resourcesService:ResourcesService){

    }

    @Post('createResource')
    public async createResource(@Body() resource:ResourcesDTO){
        return await this.resourcesService.createResource(resource);
    }

    @Get('getAllResources')
    public async getAllResources(){
        return await this.resourcesService.getAllResources();
    }

    @Get('getResourceById/:resourceid')
    public async getResourceById(@Param('resourceid') resourceId:string){
        return await this.resourcesService.getResourceById(resourceId);
    }

    @Get('getResourceByName/:resource')
    public async getResourceByName(@Param('resource') _resource:string){
        return await this.resourcesService.getResourceByName(_resource);
    }

    @Delete(":id")
    public async deleteResource(@Param('id') id:string){
        return await this.resourcesService.deleteResource(id)
    }

    @Put(":id")
    public async updateResource(@Body() resource:ResourcesUpdateDTO,@Param('id') id:string){
        return await this.resourcesService.updateResource(resource,id)
    }

    @Get('insertDefaultResources')
    public async insertDefaultResources(){
        return await this.resourcesService.insertDefaultResources();
    }
}
