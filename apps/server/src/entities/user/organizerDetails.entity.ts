import { Field, ObjectType } from "type-graphql";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import {
  SocialLinkInput,
  SocialLinksResponse,
} from "../../validators/organizers/updateOrganizerValidator";
import { Category } from "../category/category.entity";
import { CommonEntity } from "../common/common.entity";
import { User } from "./user.entity";
import { Event } from "../event/event.entity";
@ObjectType()
@Entity()
export class OrganizerDetails extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  @Index()
  organizerName: string;

  @Field(() => String)
  @Column({ nullable: false })
  address: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  website?: string;

  @Field(() => OrganizerStatus)
  @Column({
    type: "enum",
    enum: OrganizerStatus,
    default: OrganizerStatus.PENDING,
  })
  status: boolean;

  @Field(() => Boolean)
  @Column({ nullable: false })
  isGstRegister: boolean;

  @Field(() => String)
  @Column({ nullable: false })
  abnAcn: string;

  @Field(() => SocialLinksResponse, { nullable: true })
  @Column({ type: "jsonb", nullable: true })
  socialLinks: SocialLinkInput;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Category, (category) => category.organizer)
  category: Category[];
}
