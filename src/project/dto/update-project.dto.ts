import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

    name?: string;
    location?: string;
    state?: string;
    climateZone?: string;
    ecologicalZone?: string;
    startPeriod?: Date
    endPeriod?: Date
}
