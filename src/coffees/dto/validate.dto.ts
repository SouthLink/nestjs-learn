import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class ValidateCoffeeTestDto {
  id: number;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly value: number;

  @MinLength(1)
  @MaxLength(10)
  readonly desc: string;
}
