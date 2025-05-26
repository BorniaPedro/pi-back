import { Test, TestingModule } from '@nestjs/testing';
import { StratumController } from './stratum.controller';
import { StratumModule } from './stratum.module';

describe('ProjectController', () => {
  let controller: StratumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StratumController],
      providers: [StratumModule],
    }).compile();

    controller = module.get<StratumController>(StratumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
