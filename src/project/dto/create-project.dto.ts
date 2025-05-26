import { IsString, IsNotEmpty, IsDate, MaxLength, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  location: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  state: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  climateZone: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  ecologicalZone: string

  @IsDateString()
  @Type(() => String)
  startPeriod: string;

  @IsDateString()
  @Type(() => String)
  endPeriod: string;
}
