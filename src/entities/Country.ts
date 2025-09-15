import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  emoji!: string;

  @Column()
  @Field()
  continent!: string;
}
