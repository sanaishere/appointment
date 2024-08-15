import { Test, TestingModule } from '@nestjs/testing';
import { StaffsService } from '../staffs.service';

describe('StaffsService', () => {
  let service: StaffsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaffsService],
    }).compile();

    service = module.get<StaffsService>(StaffsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
