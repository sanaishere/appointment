import { Test, TestingModule } from '@nestjs/testing';
import { LeaveResolver } from '../leave.resolver';

describe('LeaveResolver', () => {
  let resolver: LeaveResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveResolver],
    }).compile();

    resolver = module.get<LeaveResolver>(LeaveResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
