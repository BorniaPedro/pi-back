import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

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
}
