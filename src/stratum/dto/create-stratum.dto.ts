import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CreateStratumDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  landUseBaseline: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  landUseProject: string;

  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @IsNumber()
  AGBstock: number;

  @IsNumber()
  AGBgrowth: number;

  @IsNumber()
  @IsOptional()
  agbStockBaseline?: number;

  @IsNumber()
  @IsOptional()
  agbGrowthBaseline?: number;

  @IsNumber()
  @IsOptional()
  agbMaxStockProject?: number;

  @IsNumber()
  @IsOptional()
  agbGrowthProject?: number;

  @IsNumber()
  @IsOptional()
  bgbToAgbRatio?: number;

  @IsNumber()
  @IsOptional()
  yearsToAgbMaxStockProject?: number;
}