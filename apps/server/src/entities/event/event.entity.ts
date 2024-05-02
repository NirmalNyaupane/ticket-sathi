import { Field, Int, ObjectType } from "type-graphql";
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { EventStatus, EventType } from "../../constants/enums/event.enum";
import { CommonEntity } from "../common/common.entity";
import { Media } from "../media/media.entity";
import { Category } from "../category/category.entity";
import mediamigrateUtil from "../../utils/mediamigrate.util";
import { MediaOf } from "../../constants/enums/media.enum";
import { EnvConfiguration } from "../../config/env.config";

@ObjectType()
@Entity()
export class Event extends CommonEntity {
  @Field(() => String)
  @Column({ nullable: false })
  @Index()
  name: string;

  @Field(() => EventType)
  @Column({ type: "enum", enum: EventType, nullable: false })
  type: EventType;

  @Field(() => String)
  @Column({ type: "text", nullable: false })
  description: string;

  @Field(() => String)
  @Column({ type: "timestamp", nullable: false })
  eventStartDate: string;

  @Field(() => String)
  @Column({ type: "timestamp", nullable: false })
  eventEndDate: string;

  @Field(() => String)
  @Column({ nullable: false })
  venue: string;

  @Field(() => [Media])
  @OneToMany(() => Media, (media) => media.event, { cascade: true })
  images: Media[];

  @Field(() => Media)
  @OneToOne(() => Media)
  @JoinColumn()
  cover: Media;

  @Field(() => EventStatus)
  @Column({ type: "enum", enum: EventStatus, default: EventStatus.PENDING })
  status: EventStatus;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  rejectionCount: number;

  @ManyToOne(() => Category, (cateogry) => cateogry.event)
  category: Category;

  @AfterInsert()
  _() {
    //migrate cover
    if (this.cover?.name) {
      mediamigrateUtil.migrate({
        mediaName: this.cover.name,
        type: MediaOf.Event,
        eventId: this.id,
      });
    }

    //migrate images
    if (this.images && this.images.length > 0) {
      for (let image of this.images) {
        mediamigrateUtil.migrate({
          mediaName: image.name,
          type: MediaOf.Event,
          eventId: this.id,
        });
      }
    }
  }

  @AfterLoad()
  __() {
    if (this.cover?.name) {
      this.cover.name = `${EnvConfiguration.BACKEND_URL}/uploads/event/${this.id}/${this.cover.name}`;
    }

    if (this.images.length > 0) {
      for (let image of this.images) {
        image.name = `${EnvConfiguration.BACKEND_URL}/uploads/event/${this.id}/${image.name}`;
      }
    }
  }
}
