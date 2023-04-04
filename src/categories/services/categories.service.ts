import { Injectable } from '@nestjs/common';
import { CategoryDTO } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from '../entities/categories.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/errors.manager';
import { Categories } from 'src/constants/categories';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}
  public async getCateoryByName(_category: string): Promise<CategoriesEntity> {
    try {
      const category: CategoriesEntity = await this.categoriesRepository
        .createQueryBuilder('category')
        .where('category.category = :category', { category: _category })
        .getOne();
      if (!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro la categoria',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async insertDefaultCategories(): Promise<any> {
    try {
      const categories: CategoriesEntity[] =
        await this.categoriesRepository.find();
      if (categories.length > 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Ya hay categorias creados',
        });
      }
      Categories.forEach(async (category) => {
        await this.createCategory({ category });
      });
      return { message: 'Registros insertados correctamente' };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCategory(id: string): Promise<DeleteResult> {
    try {
      const category: DeleteResult = await this.categoriesRepository.delete(id);
      if (category.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminaron registros',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async updateCategory(
    category: CategoryDTO,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const _category: UpdateResult = await this.categoriesRepository.update(
        id,
        category,
      );
      if (_category.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizaron los registros',
        });
      }
      return _category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getCateoryById(id: string): Promise<CategoriesEntity> {
    try {
      const category: CategoriesEntity = await this.categoriesRepository
        .createQueryBuilder('category')
        .where({ id })
        .getOne();
      if (!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro el id',
        });
      }
      return category;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async getAllCategories(): Promise<CategoriesEntity[]> {
    try {
      const categories: CategoriesEntity[] =
        await this.categoriesRepository.find();
      if (categories.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No hay registros',
        });
      }
      return categories;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
  public async createCategory(
    _category: CategoryDTO,
  ): Promise<CategoriesEntity> {
    try {
      return await this.categoriesRepository.save(_category);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
