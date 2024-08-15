import { Test, TestingModule } from '@nestjs/testing';
import { SalaryRateService } from '../salary-rate.service';

describe('SalaryRateService', () => {
  let service: SalaryRateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryRateService],
    }).compile();

    service = module.get<SalaryRateService>(SalaryRateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
