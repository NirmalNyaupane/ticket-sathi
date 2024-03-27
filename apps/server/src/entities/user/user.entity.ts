import { Field, ObjectType } from "type-graphql";
import { CommonEntity } from "../common/common.entity";
import { AuthType, UserRole } from "../../constants/enums/auth.enum";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { OrganizerDetails } from "./organizerDetails.entity";
import { OrganizerDocuments } from "./organizerDocuments.entity";
import { Media } from "../media/media.entity";

@ObjectType()
@Entity()
export class User extends CommonEntity {
    @Field(() => String)
    @Column({ nullable: false })
    fullName: string;

    @Field(() => String)
    @Column({ nullable: false })
    email: string;

    @Field(() => String)
    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false, select: false })
    password: string;

    @Field(() => UserRole)
    @Column({ nullable: false, type: "enum", enum: UserRole })
    role: UserRole

    @Field(() => AuthType)
    @Column({ nullable: false, type: "enum", enum: AuthType })
    authType: AuthType

    @Field(() => Boolean)
    @Column({ default: false })
    isVerified: boolean;


    @Field(() => OrganizerDetails, { nullable: true })
    @OneToOne(() => OrganizerDetails, (u) => u.user)
    organizerDetails?: OrganizerDetails;

    @Field(() => OrganizerDocuments, { nullable: true })
    @OneToOne(() => OrganizerDocuments, { cascade: true })
    @JoinColumn()
    organizerDocuments?: OrganizerDocuments

    @Field(() => Media, { nullable: true })
    @OneToOne(() => Media, { cascade: true })
    @JoinColumn()
    profile: Media

    @Column({ nullable: true, select: false })
    refreshToken?: string;

    @Column({ nullable: true, select: false })
    forgotPasswordToken?: string;

    @Column({ nullable: true, select: false })
    otp?: string; //store hash otp

    @Column({ nullable: true, select: false, type: "timestamp" })
    otpExpires?: Date;
}