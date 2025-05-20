import { IsString, IsNotEmpty, IsDate, MaxLength } from 'class-validator';
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

  @IsDate()
  @Type(() => Date)
  startPeriod: Date;

  @IsDate()
  @Type(() => Date)
  endPeriod: Date;
}
