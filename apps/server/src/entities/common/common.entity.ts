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

  @Field(() => Date)
  @CreateDateColumn({
    type: "timestamp",
    // default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date | null;
}
