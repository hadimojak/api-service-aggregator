import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsUrl,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ProviderQueryDto {
  @ApiPropertyOptional({ example: 'PAYPAL_01' })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  code?: string;

  @ApiPropertyOptional({ example: 'payment' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  type?: string;

  @ApiPropertyOptional({ example: 'https://api.paypal.com' })
  @IsUrl()
  @IsOptional()
  baseUrl?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number) // ✅ converts string query to number
  priority?: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true') // ✅ converts string to boolean
  isActive?: boolean;

  @ApiPropertyOptional({ example: 10000 })
  @IsInt()
  @IsOptional()
  @Min(100)
  @Max(60000)
  @Type(() => Number)
  timeout?: number;
}
