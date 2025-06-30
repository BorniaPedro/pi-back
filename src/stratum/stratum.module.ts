import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stratum } from './entities/stratum.entity';
import { StratumController } from './stratum.controller';
import { StratumService } from './stratum.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stratum])],
  controllers: [StratumController],
  providers: [StratumService],
})
export class StratumModule {}
