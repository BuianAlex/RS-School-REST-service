import { Length, IsNumber, IsUUID, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @Length(3, 30)
  title!: string;

  @IsOptional()
  // @IsUUID()
  boardId!: string;

  @IsNumber()
  order!: number;

  @Length(3, 30)
  description!: string;

  @IsOptional()
  // @IsUUID()||
  userId!: string;

  @IsOptional()
  // @IsUUID()
  columnId!: string;
}
