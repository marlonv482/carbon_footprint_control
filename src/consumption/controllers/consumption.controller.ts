import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsumptionService } from '../services/consumption.service';
import { ConsumptionTDO } from '../dto/consumption.dto';

@Controller('consumption')
@ApiTags('Consumption')
export class ConsumptionController {

    constructor(private readonly consumptionService:ConsumptionService){

    }

    @Post('createConsumptionElectricity')
    public async createConsumptionFuel(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Combustible')
    }
    @Post('createConsumptionElectricity')
    public async createConsumptionElectricity(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Electricidad')
    }
    @Post('createConsumptionRefrigerant')
    public async createConsumptionRefrigerant(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Refrigerante')
    }
    @Post('createConsumptionTrips')
    public async createConsumptionTrips(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Viajes')
    }
    @Post('createConsumptionPaper')
    public async createConsumptionPaper(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Papel Bond')
    }
    @Post('createConsumptionOil')
    public async createConsumptionOil(@Body() consumption:ConsumptionTDO ){
        return this.consumptionService.createConsumptionByResource(consumption,'Aceite')
    }
   

    @Get('monthWithLessRefrigerantloss')
    public async monthWithLessRefrigerantloss(){
        return this.consumptionService.monthWithLessRefrigerantloss()
    }

    @Get('getAverageTrips')
    public async getAverageTrips(){
        return await this.consumptionService.getAverageTrips()
    }

}
