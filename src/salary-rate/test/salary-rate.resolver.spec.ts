import { Test, TestingModule } from '@nestjs/testing';
import { SalaryRateResolver } from '../salary-rate.resolver';

describe('SalaryRateResolver', () => {
  let resolver: SalaryRateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryRateResolver],
    }).compile();

    resolver = module.get<SalaryRateResolver>(SalaryRateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
