import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UnitsService } from '../services/units.service';
import { UnitDTO } from '../dto/unit.dto';

@Controller('units')
@ApiTags('Units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get('getAllUnits')
  public async getAllUnits() {
    return await this.unitsService.getAllUnits();
  }

  @Get('getUnitById/:unitId')
  public async getUnitById(@Param('unitId') unitId: string) {
    return await this.unitsService.getUnitById(unitId);
  }
  @Get('getUnitByName/:unit')
  public async getUnitByName(@Param('unit') unit: string) {
    console.log(unit);
    return await this.unitsService.getUnitByName(unit);
  }

  @Post('createUnit')
  public async createUnit(@Body() unit: UnitDTO) {
    return this.unitsService.createUnit(unit);
  }
  @Delete('deleteUnit/:unitId')
  public async deleteUnit(@Param('unitId') unitId: string) {
    
    return await this.unitsService.deleteUnit(unitId);
  }
  @Put('updateUnit/:unitId')
  public async updateUnit(
    @Body() unit: UnitDTO,
    @Param('unitId') unitId: string,
  ) {
    return await this.unitsService.updateUnit(unit, unitId);
  }

  @Get('insertDefaultUnits')
  public async insertDefaultUnits() {
    return this.unitsService.insertDefaultUnits();
  }
}
