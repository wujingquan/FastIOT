import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Api } from './entities/Apit';

@Injectable()
export class BaseService {
  Entity;

  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Api)
    private readonly repository: EntityRepository<Api>,
  ) {}
  async create(createRoleDto) {
    const entity = new this.Entity();
    wrap(entity).assign(createRoleDto);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  findAll() {
    return this.repository.findAndCount({});
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateEntityDto) {
    const entity = await this.repository.findOne({ id });
    wrap(entity).assign(updateEntityDto);
    await this.em.flush();
    return entity;
  }

  async remove(id: number) {
    const entity = await this.repository.findOne({ id });
    return await this.em.removeAndFlush(entity);
  }
}
