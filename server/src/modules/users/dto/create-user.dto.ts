import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsString()
  @Length(1, 100)
  readonly email: string;

  @IsString()
  @Length(14)
  readonly cpf: string;

  @IsString()
  readonly celular?: string;

  @IsString({ each: true })
  readonly knowledge: string[];
}
