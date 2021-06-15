import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@ObjectType()
@InputType()
export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({message: 'This field should be not empty.'})
  @Field()
  @IsOptional()
  name?: string;
  
  @IsEmail()
  @IsNotEmpty({message: 'This field should be not empty.'})
  @Field()
  @IsOptional()
  email?: string;
}
