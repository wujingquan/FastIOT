import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  pid: number;

  @Property()
  role_id: number;

  @Property()
  name: string;
}
