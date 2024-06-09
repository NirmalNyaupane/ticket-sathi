import { Column } from "typeorm";
import { CommonEntity } from "../common/common.entity";

export class CommissionEntity extends CommonEntity {
  @Column({type:"int"})
  commission: number;
}
