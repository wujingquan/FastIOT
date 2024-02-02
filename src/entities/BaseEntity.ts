import { PrimaryKey, Property } from '@mikro-orm/core';
import { SoftDeletable } from 'mikro-orm-soft-delete';
@SoftDeletable(() => BaseEntity, 'deletedAt', () => new Date())
export class BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property({ nullable: true })
  deletedAt: Date;
}
