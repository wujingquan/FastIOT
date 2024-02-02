import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/core';
import { Role } from 'src/entities/Role';

@Injectable()
export class RoleService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const role = new Role();
    wrap(role).assign(createRoleDto);
    await this.em.persistAndFlush(role);
    return role;
  }

  findAll() {
    return this.roleRepository.findAndCount({});
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ id });
    wrap(role).assign(updateRoleDto);
    await this.em.flush();
    return role;
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ id });
    return await this.em.removeAndFlush(role);
  }
}
