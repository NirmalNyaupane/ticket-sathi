import { Field, InputType } from "type-graphql";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  ValidateIf,
} from "class-validator";
import { EventStatus } from "../../constants/enums/event.enum";
type UUID = `${string}-${string}-${string}-${string}-${string}`;

@InputType()
export class AdminOrganizerValidator {
  @Field(() => OrganizerStatus)
  @IsNotEmpty()
  @IsEnum(OrganizerStatus)
  status: OrganizerStatus;

  @Field(() => String, { nullable: true })
  @ValidateIf(
    (obj: AdminOrganizerValidator) => obj.status === OrganizerStatus.REJECTED
  )
  @IsNotEmpty()
  @Length(20, 30)
  reason: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  organizerId: UUID;
}

@InputType()
export class AdminEventValidator {
  @Field(() => EventStatus)
  @IsNotEmpty()
  @IsEnum(EventStatus)
  status: EventStatus;

  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  eventId: UUID;

  @Field(() => String, { nullable: true })
  @ValidateIf(
    (obj: AdminEventValidator) => obj.status === EventStatus.REJECTED
  )
  @IsNotEmpty()
  @IsString()
  @Length(30)
  rejectedReason: string;
}
