import {
  IsString,
  Length,
  IsNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @Length(5, 30)
  name?: string;

  @IsString()
  @Length(5, 30)
  @IsNotEmpty()
  login!: string;

  @IsString()
  @Length(5, 30)
  @IsNotEmpty()
  password!: string;
}
