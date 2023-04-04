import { Injectable } from '@nestjs/common';
import { UnitDTO } from '../dto/unit.dto';
import { UnitsEntity } from '../entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Units } from 'src/constants/units';

@Injectable()
export class UnitsService {
  public async createUnit(body: UnitDTO): Promise<UnitsEntity> {
    try {
      const unit = await this.unitRepository.save(body);
      return unit;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getUnitById(id: string): Promise<UnitsEntity> {
    try {
      const unit: UnitsEntity = await this.unitRepository
        .createQueryBuilder('project')
        .where({ id })
        .getOne();
      if (!unit) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el id',
        });
      }
      return unit;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   *
   * @returns UnitsEntity[]
   */
  public async getAllUnits(): Promise<UnitsEntity[]> {
    try {
      const units: UnitsEntity[] = await this.unitRepository.find();
      if (units.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return units;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async insertDefaultUnits(): Promise<any> {
    try {
      const resources: UnitsEntity[] = await this.unitRepository.find();
      if (resources.length > 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya hay unidades creados',
        });
      }
      Units.forEach(async (unit) => {
        await this.createUnit({ unit });
      });
      return { message: 'Registros insertados correctamente' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateUnit(_unit: UnitDTO, id: string): Promise<UpdateResult> {
    try {
      const unit: UpdateResult = await this.unitRepository.update(id, _unit);
      if (unit.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return unit;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  async deleteUnit(id: string): Promise<DeleteResult> {
    try {
      const unit: DeleteResult = await this.unitRepository.delete(id);
      if (unit.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return unit;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getUnitByName(_unit: string): Promise<UnitsEntity> {
    try {
      const unit: UnitsEntity = await this.unitRepository
        .createQueryBuilder('unit')
        .where('unit.unit = :unit', { unit: _unit })
        .getOne();
      if (!unit) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro la Unidad',
        });
      }
      return unit;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  constructor(
    @InjectRepository(UnitsEntity)
    private readonly unitRepository: Repository<UnitsEntity>,
  ) {}
}
