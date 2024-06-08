import { Field, InputType } from "type-graphql";
import { OrganizerStatus } from "../../constants/enums/organizer.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsUUID,
  Length,
  ValidateIf,
} from "class-validator";
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
