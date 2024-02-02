import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Api extends BaseEntity {
  @Property()
  group: string;

  @Property()
  name: string;
  
  @Property()
  description: string;

  @Property()
  method: string;

  @Property()
  path: string;
}
