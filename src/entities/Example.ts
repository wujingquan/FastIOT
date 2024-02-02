import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Example extends BaseEntity {
  @Property()
  username: string;

  @Property()
  password: string;
}
