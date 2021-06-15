import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@ObjectType()
@InputType()
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({message: 'This field should be not empty.'})
  @Field()
  name: string;

  @IsEmail()
  @IsNotEmpty({message: 'This field should be not empty.'})
  @Field()
  email: string;
}
