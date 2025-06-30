import { PartialType } from '@nestjs/mapped-types';
import { CreateStratumDto } from './create-stratum.dto';

export class UpdateStratumDto extends PartialType(CreateStratumDto) {
      name?: string;
      landUseBaseline?: string;
      landUseProject?: string;
}
