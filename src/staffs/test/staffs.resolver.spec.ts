import { Test, TestingModule } from '@nestjs/testing';
import { StaffsResolver } from '../staffs.resolver';

describe('StaffsResolver', () => {
  let resolver: StaffsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffsResolver],
    }).compile();

    resolver = module.get<StaffsResolver>(StaffsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
