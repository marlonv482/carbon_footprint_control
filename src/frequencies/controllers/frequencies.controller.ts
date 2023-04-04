import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FrequenciesService } from '../services/frequencies.service';
import { FrecuencyDTO } from '../dto/frecuency.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('frequencies')
@ApiTags('Frecuencies')
export class FrequenciesController {
    constructor(private readonly frequenciesService: FrequenciesService) {}

    @Get('getAllfrecuencies')
    public async getAllfrecuencies() {
      return await this.frequenciesService.getAllfrecuencies();
    }
  
    @Get('getFrecuencyById/:frecuencyId')
    public async getFrecuencyById(@Param('frecuencyId') frecuencyId: string) {
      return await this.frequenciesService.getFrecuencyById(frecuencyId);
    }
    @Get('getFrecuencyByName/:frecuency')
    public async getFrecuencyByName(@Param('frecuency') frecuency: string) {
      return await this.frequenciesService.getFrecuencyByName(frecuency);
    }
  
    @Post('createFrecuency')
    public async createFrecuency(@Body() frecuency: FrecuencyDTO) {
      return this.frequenciesService.createFrecuency(frecuency);
    }
    @Delete('deleteFrecuency/:frecuencyId')
    public async deleteFrecuency(@Param('frecuencyId') frecuencyId: string) {
      
      return await this.frequenciesService.deleteFrecuency(frecuencyId);
    }
    @Put('updateFrecuency/:frecuencyId')
    public async updateFrecuency(
      @Body() frecuency: FrecuencyDTO,
      @Param('frecuencyId') frecuencyId: string,
    ) {
      return await this.frequenciesService.updateFrecuency(frecuency, frecuencyId);
    }
  
    @Get('insertDefaultFrecuencies')
    public async insertDefaultFrecuencies() {
      return this.frequenciesService.insertDefaultFrecuencies();
    }
}
