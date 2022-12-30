import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDot {
  @IsPositive() // 正整数
  @IsOptional() // 是否可选
  // @Type(() => Number)
  limit: number;

  @IsPositive() // 正整数
  @IsOptional() // 是否可选
  // @Type(() => Number)
  offset: number;
}
