import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { StratumService } from './stratum.service';
import { CreateStratumDto } from './dto/create-stratum.dto';
import { UpdateStratumDto } from './dto/update-stratum.dto';

@Controller('stratum')
export class StratumController {
  constructor(private readonly stratumService: StratumService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  create(@Body() createStratumDto: CreateStratumDto) {
    return this.stratumService.create(createStratumDto);
  }

  @Get()
  findAll() {
    return this.stratumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stratumService.findOne(+id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id') id: string,
    @Body() updateStratumDto: UpdateStratumDto,
  ) {
    return this.stratumService.update(+id, updateStratumDto); 
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stratumService.remove(+id);
  }
}
