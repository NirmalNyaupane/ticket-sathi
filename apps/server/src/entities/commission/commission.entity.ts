import { Column, Entity } from "typeorm";
import { CommonEntity } from "../common/common.entity";
import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class CommissionEntity extends CommonEntity {
  @Field(() => Float, { nullable: true })
  @Column({ type: "int" })
  commission: number;
}
