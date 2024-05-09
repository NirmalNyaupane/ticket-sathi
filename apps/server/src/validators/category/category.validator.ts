import {
  IsNotEmpty,
  IsOptional,
  IsSemVer,
  IsString,
  Length,
} from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCategoryValidation {
  @Field(() => String)
  @IsNotEmpty()
  @Length(3)
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @Length(10)
  description: string;
}

@InputType()
export class UpdateCategoryValidation {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(3)
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @Length(10)
  description: string;
}
