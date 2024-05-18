import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { UserService } from '../user/user.service';
import { transactionsProviders } from './transaction.provider';
import { usersProviders } from '../user/user.provider';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        UserService,
        ...transactionsProviders,
        ...usersProviders,
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
