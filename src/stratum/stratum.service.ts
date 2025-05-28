import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stratum } from './entities/stratum.entity';
import { CreateStratumDto } from './dto/create-stratum.dto';
import { UpdateStratumDto } from './dto/update-stratum.dto';

@Injectable()
export class StratumService {
  constructor(
    @InjectRepository(Stratum)
    private readonly stratumRepository: Repository<Stratum>,
  ) {}

  async create(createStratumDto: CreateStratumDto) {
    const stratum = this.stratumRepository.create(createStratumDto);

    return await this.stratumRepository.save(stratum);
  }

  async findAll() {
    return await this.stratumRepository.find();
  }

async findOne(id: number) {
  if (typeof id !== 'number' || isNaN(id)) {
    throw new NotFoundException('Invalid ID! ID must be a number.');
  }

  const stratum = await this.stratumRepository.findOneBy({ id });

  if (!stratum) {
    throw new NotFoundException(
      'Stratum not found. Please insert a valid ID!',
    );
  }

  return stratum;
}

  async update(id: number, updateStratumDto: UpdateStratumDto) {
    await this.findOne(id);

    await this.stratumRepository.update(id, updateStratumDto);

    return await this.stratumRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.stratumRepository.delete(id);
  }
}
