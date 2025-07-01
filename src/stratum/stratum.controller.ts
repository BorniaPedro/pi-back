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
  @Get('/biomass/agbgrowth/:name')
  getAgbGrowth(@Param('name') name: string){
    const data = require('../../data/AGBgrowth.json');
    const category = data.categories.find(cat => cat.name === name)

    if(!category){
      return { error: 'Category not found!'}
    }

    const southAmericaValues = category.regions
    .filter(region => region.region === 'South America')
    .map(region => region.value)

    return southAmericaValues
  }

  @Get('/biomass/agb/:name')
  getAgb(@Param('name') name: string){
    const data = require('../../data/AGB.json'); 
    const category = data.categories.find(cat => cat.name === name)

    if(!category){
      return { error: 'Category not found!'}
    }

    const southAmericaValues = category.regions
    .filter(region => region.region === 'South America')
    .map(region => region.value)

    return southAmericaValues
  }
  @Get('/biomass/agbbgb/:name')
  getAgbBgb(@Param('name') name: string) {
    const data = require('../../data/AGB-BGB.json');
    const category = data.categories.find((cat: any) => cat.name === name);

    if (!category) {
      return { error: 'Category not found!' };
    }

    // Retorna apenas os valores de 'value' das regiões 'South America' ou 'NA' como inteiros
    const values = category.regions
      .filter((region: any) => region.region === 'South America' || region.region === 'NA')
      .map((region: any) => parseFloat(region.value));

    return values;
  }
  @Get('/soil/fi')
  getFi() {
    return 10;
  }

  @Get('/soil/flu/')
  getFlu() {
    return 10;
  }

  @Get('/soil/fmg')
  getFmg() {
    return 10;
  }

  @Get('/soil/socref')
  getSocRef() {
    return 10;
  }

  @Get('/soil/socbaseline')
  getSocbaseline() {
    return 10;
  }

  @Get('/soil/socmax')
  getSocmax() {
    return 10;
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
