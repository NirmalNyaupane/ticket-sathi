import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

@ObjectType()
export class CommonEntity extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: UUID;

  @Field(() => String)
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
