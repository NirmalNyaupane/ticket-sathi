import { Field, ObjectType } from "type-graphql";
import { CommonEntity } from "../common/common.entity";
import { Media } from "../media/media.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
@ObjectType()
@Entity()
export class OrganizerDocuments extends CommonEntity {
    @Field(() => Media)
    @OneToOne(() => Media, { cascade: true })
    @JoinColumn()
    logo: Media;

    @Field(() => [Media])
    @ManyToMany(() => Media, { cascade: true })
    @JoinTable()
    documents: Media[];
}