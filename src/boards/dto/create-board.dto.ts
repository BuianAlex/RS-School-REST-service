import {
  Length,
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { ColumnEnt } from '../../columns/entities/column.entity';
export class CreateBoardDto {
  @IsOptional()
  @IsUUID()
  id!: string;

  @Length(5, 30)
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnEnt)
  columns!: ColumnEnt[];
}
