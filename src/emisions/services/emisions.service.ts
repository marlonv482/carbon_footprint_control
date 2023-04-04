import { Injectable } from '@nestjs/common';
import { EmisionDTO } from '../dto/emision.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { EmisionsEntity } from '../entities/emisions.entity';
import { Emisions } from 'src/constants/emisions';

@Injectable()
export class EmisionsService {
  constructor(
    @InjectRepository(EmisionsEntity)
    private readonly emisionsRepository: Repository<EmisionsEntity>,
  ) {}

  public async updateEmision(
    emision: EmisionDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const _emision: UpdateResult = await this.emisionsRepository.update(
        id,
        emision,
      );
      if (_emision.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return _emision;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getAllEmisions(): Promise<EmisionsEntity[]> {
    try {
      const emisions: EmisionsEntity[] = await this.emisionsRepository.find();
      if (emisions.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return emisions;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async createEmision(emision: EmisionDTO): Promise<EmisionsEntity> {
    try {
      return await this.emisionsRepository.save(emision);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteEmision(id: string): Promise<DeleteResult> {
    try {
      const emision: DeleteResult = await this.emisionsRepository.delete(id);
      if (emision.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return emision;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async getEmisionById(id: string): Promise<EmisionsEntity> {
    try {
      const _emision: EmisionsEntity = await this.emisionsRepository
        .createQueryBuilder('emision')
        .where({ id })
        .getOne();
      if (!_emision) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el id',
        });
      }
      return _emision;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getEmisionByName(_emision: string): Promise<EmisionsEntity> {
    try {
      const emision: EmisionsEntity = await this.emisionsRepository
        .createQueryBuilder('emision')
        .where('emision.emision = :emision', { emision: _emision })
        .getOne();
      if (!emision) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro la emision',
        });
      }
      return emision;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async insertDefaultEmisions(): Promise<any> {
    try {
      const emisions: EmisionsEntity[] = await this.emisionsRepository.find();
      if (emisions.length > 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya hay recursos creados',
        });
      }
      Emisions.forEach(async (emision) => {
        await this.createEmision({ emision });
      });
      return { message: 'Registros insertados correctamente' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
