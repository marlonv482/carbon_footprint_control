import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitiesService } from '../services/activities.service';
import { ActivityDTO } from '../dto/activity.dto';

@Controller('activities')
@ApiTags('Activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post('createActivity')
    public async createActivity(@Body() activity:ActivityDTO){
        return await this.activitiesService.createActivity(activity);
    }

    @Get('getAllActivities')
    public async getAllActivities(){
        return await this.activitiesService.getAllActivities();
    }

    @Get('getActivityById/:activityId')
    public async getActivityById(@Param('activityId') activityId:string){
        return await this.activitiesService.getActivityById(activityId);
    }

    @Get('getActivityByName/:activity')
    public async getActivityByName(@Param('activity') _activity:string){
        return await this.activitiesService.getActivityByName(_activity);
    }

    @Delete("deleteActivity/:id")
    public async deleteActivity(@Param('id') id:string){
        return await this.activitiesService.deleteActivity(id)
    }

    @Put("updateActivity/:id")
    public async updateActivity(@Body() _activity:ActivityDTO,@Param('id') id:string){
        return await this.activitiesService.updateActivity(_activity,id)
    }

    @Get('insertDefaultActivities')
    public async insertDefaultActivities(){
        return await this.activitiesService.insertDefaultActivities();
    }
    @Get('getActivityByResource/:resource')
    public async getActivityByResource(@Param('resource') _resource:string){
        return await this.activitiesService.getActivityByResource(_resource);
    }

}
