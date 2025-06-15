import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

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

}
