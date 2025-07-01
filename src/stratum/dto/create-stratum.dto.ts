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
  @IsOptional()
  agbStockBaseline?: number;

  @IsNumber()
  @IsOptional()
  agbGrowthBaseline?: number;

  @IsNumber()
  @IsOptional()
  agbStockProject?: number;

  @IsNumber()
  @IsOptional()
  agbGrowthProject?: number;

  @IsNumber()
  @IsOptional()
  agbToBgbRatio?: number;

  @IsNumber()
  @IsOptional()
  yearsToAgbMaxStockProject?: number;

  @IsNumber()
  @IsOptional()
  yearsToAgbMaxStock?: number

  @IsNumber()
  @IsOptional()
  SOCref?: number

  @IsNumber()
  @IsOptional()
  flu?: number

  @IsNumber()
  @IsOptional()
  fi?: number

  @IsNumber()
  @IsOptional()
  fmg?: number

  @IsNumber()
  @IsOptional()
  SOCbaseline?: number

  @IsNumber()
  @IsOptional()
  SOCmaxProject?: number

  @IsNumber()
  @IsOptional()
  AnnualSOCchange?: number

  @IsNumber()
  @IsOptional()
  yearsToSOCmaxProject?: number
}