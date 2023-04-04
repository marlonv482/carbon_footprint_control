import { Injectable } from '@nestjs/common';
import { FrecuencyDTO } from '../dto/frecuency.dto';
import { FrecuenciesEntity } from '../entities/frecuency.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Frecuencies } from 'src/constants/frecuencies';

@Injectable()
export class FrequenciesService {
    constructor(
        @InjectRepository(FrecuenciesEntity)
        private readonly frecuencyRepository: Repository<FrecuenciesEntity>,
      ) {}
      /**
       * 
       * @param frecuencyId 
       * @returns 
       */
    public async deleteFrecuency(frecuencyId: string) :Promise<DeleteResult> {
        try {
            const frecuency: DeleteResult = await this.frecuencyRepository.delete(frecuencyId);
            if (frecuency.affected === 0) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No se eliminaron registros',
              });
            }
            return frecuency;
          } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
          }
    }
    
    public async  createFrecuency(frecuency: FrecuencyDTO): Promise<FrecuenciesEntity> {
        try {
            return await this.frecuencyRepository.save(frecuency);
           
          } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
          }
      }
/**
 * 
 * @param _frecuency 
 * @returns 
 */
    public async  getFrecuencyByName(_frecuency: string): Promise<FrecuenciesEntity> {
    try {
      const frecuency: FrecuenciesEntity = await this.frecuencyRepository
        .createQueryBuilder('frecuency')
        .where('frecuency.frecuency = :frecuency',{ frecuency:_frecuency })
        .getOne();
      if (!frecuency) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro la frecuencia',
        });
      }
      return frecuency;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

    public async  getFrecuencyById(id: string): Promise<FrecuenciesEntity> {
        try {
          const frecuency: FrecuenciesEntity = await this.frecuencyRepository
            .createQueryBuilder('frecuency')
            .where({ id })
            .getOne();
          if (!frecuency) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No se encontro el id',
            });
          }
          return frecuency;
        } catch (error) {
          throw ErrorManager.createSignatureError(error.message);
        }
      }
    
    public async  getAllfrecuencies() : Promise<FrecuenciesEntity[]> {
        try {
          const frecuencies: FrecuenciesEntity[] = await this.frecuencyRepository.find();
          if (frecuencies.length === 0) {
            throw new ErrorManager({
              type: 'BAD_REQUEST',
              message: 'No hay registros',
            });
          }
          return frecuencies;
        } catch (error) {
          throw ErrorManager.createSignatureError(error.message);
        }
      }
    public async  insertDefaultFrecuencies():Promise<any>{
        try {
            const frecuencies:FrecuenciesEntity[]=await this.frecuencyRepository.find();
            if(frecuencies.length>0){
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'Ya hay frecuencias creadas',
                  }); 
            }
            Frecuencies.forEach(async (frecuency)=>{
                await this.createFrecuency({frecuency})
            })
            return {message:'Registros insertados correctamente'}
           
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
      }

    public async  updateFrecuency(_frecuency: FrecuencyDTO, id: string):Promise<UpdateResult> {
        try {
            const frecuency: UpdateResult = await this.frecuencyRepository.update(
              id,
              _frecuency,
            );
            if (frecuency.affected === 0) {
              throw new ErrorManager({
                type: 'BAD_REQUEST',
                message: 'No se actualizaron los registros',
              });
            }
            return frecuency;
          } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
          }
    }
    
}
