import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmisionDTO } from '../dto/emision.dto';
import { EmisionsService } from '../services/emisions.service';

@Controller('emisions')
@ApiTags('Emisions')
export class EmisionsController {
    constructor(private readonly emisionsService:EmisionsService){

    }

    @Post('createEmision')
    public async createEmision(@Body() emision:EmisionDTO){
        return await this.emisionsService.createEmision(emision);
    }

    @Get('getAllEmisions')
    public async getAllEmisions(){
        return await this.emisionsService.getAllEmisions();
    }

    @Get('getEmisionById/:emisionId')
    public async getEmisionById(@Param('emisionId') emisionId:string){
        return await this.emisionsService.getEmisionById(emisionId);
    }

    @Get('getEmisionByName/:emision')
    public async getEmisionByName(@Param('emision') _emision:string){
        return await this.emisionsService.getEmisionByName(_emision);
    }

    @Delete("deleteEmision/:id")
    public async deleteEmision(@Param('id') id:string){
        return await this.emisionsService.deleteEmision(id)
    }

    @Put("updateEmision/:id")
    public async updateEmision(@Body() emision:EmisionDTO,@Param('id') id:string){
        return await this.emisionsService.updateEmision(emision,id)
    }

    @Get('insertDefaultEmisions')
    public async insertDefaultEmisions(){
        return await this.emisionsService.insertDefaultEmisions();
    }
}
