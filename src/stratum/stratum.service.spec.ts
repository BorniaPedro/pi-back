import { Test, TestingModule } from '@nestjs/testing';
import { StratumService } from './stratum.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stratum } from './entities/stratum.entity';

describe('StratumService', () => {
  let service: StratumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StratumService,
        {
          provide: getRepositoryToken(Stratum),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StratumService>(StratumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
