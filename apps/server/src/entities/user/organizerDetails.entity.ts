import { IsOptional, IsUrl } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import { CommonEntity } from "../common/common.entity";
import { User } from "./user.entity";
import { SocialLinkInput, SocialLinksResponse } from '../../validators/organizers/updateOrganizerValidator';

@ObjectType()
@Entity()
export class OrganizerDetails extends CommonEntity {
    @Field(() => String)
    @Column({ nullable: false })
    organizerName: string;

    @Field(() => String)
    @Column({ nullable: false })
    address: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    bio?: string

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    website?: string;

    @Field(() => OrganizerStatus)
    @Column({ type: "enum", enum: OrganizerStatus, default: OrganizerStatus.PENDING })
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
}

