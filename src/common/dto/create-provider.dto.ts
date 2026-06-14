import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsUrl,
  Min,
  Max,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProviderDto {
  @ApiProperty({ description: 'Unique code identifier', example: 'PAYPAL_01' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(({ value }) => value?.trim())
  code!: string;

  @ApiProperty({ description: 'Type of the provider', example: 'payment' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  type!: string;

  @ApiProperty({ description: 'Base URL for the provider API' })
  @IsUrl()
  @IsNotEmpty()
  baseUrl!: string;

  @ApiProperty({ description: 'API Key for authentication' })
  @IsString()
  @IsNotEmpty()
  apiKey!: string;

  @ApiPropertyOptional({
    default: 1,
    description: 'Higher numbers have higher priority',
  })
  @IsInt()
  @IsOptional()
  @Min(1)
  priority?: number = 1;

  @ApiPropertyOptional({ default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiPropertyOptional({ default: 10000, description: 'Timeout in ms' })
  @IsInt()
  @IsOptional()
  @Min(100)
  @Max(60000)
  timeout?: number = 10000;
}
