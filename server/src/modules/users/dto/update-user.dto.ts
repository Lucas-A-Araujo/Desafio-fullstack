import { IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  readonly status: boolean;
}
