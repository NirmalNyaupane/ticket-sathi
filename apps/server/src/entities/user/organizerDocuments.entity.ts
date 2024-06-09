import { Field, ObjectType } from "type-graphql";
import { CommonEntity } from "../common/common.entity";
import { Media } from "../media/media.entity";
import { AfterInsert, AfterLoad, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from "typeorm";
import { EnvConfiguration } from "../../config/env.config";
import mediamigrateUtil from "../../utils/mediamigrate.util";
import { MediaOf } from "../../constants/enums/media.enum";
@ObjectType()
@Entity()
export class OrganizerDocuments extends CommonEntity {
  @Field(() => Media, { nullable: true })
  @OneToOne(() => Media, { cascade: true })
  @JoinColumn()
  logo: Media;

  @Field(() => [Media], { nullable: true })
  @ManyToMany(() => Media, { cascade: true })
  @JoinTable()
  documents: Media[];

  @AfterInsert()
  __() {
    //migrate cover
    if (this.logo?.name) {
      mediamigrateUtil.migrate({
        mediaName: this.logo.name,
        type: MediaOf.Organizer,
        organizerDetailsId: this.id,
      });
    }

    //migrate images
    if (this.documents && this.documents.length > 0) {
      for (let image of this.documents) {
        mediamigrateUtil.migrate({
          mediaName: image.name,
          type: MediaOf.Organizer,
          organizerDetailsId: this.id,
        });
      }
    }
  }

  @AfterLoad()
  _() {
    if (this.logo) {
      this.logo.name = `${EnvConfiguration.BACKEND_URL}/uploads/organizer/${this.id}/${this.logo.name}`;
    }

    if (this.documents && this.documents.length > 0) {
        for (let image of this.documents) {
            image.name = `${EnvConfiguration.BACKEND_URL}/uploads/organizer/${this.id}/${image.name}`;
        }
      }
  }
}
