import { IsEmpty, IsNotEmpty } from "class-validator";

export class CreateApiDto {
  @IsNotEmpty()
  group: string;

  @IsNotEmpty()
  name: string;

  @IsEmpty()
  description: string;

  @IsNotEmpty()
  method: string;

  @IsNotEmpty()
  path: string;
}
