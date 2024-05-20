import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { UserService } from '../user/user.service';
import { transactionsProviders } from './transaction.provider';
import { usersProviders } from '../user/user.provider';
import { createMemDB } from '../database/create-mem-db';
import { Transaction } from './entities/transaction.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let memDb: Sequelize;

  beforeEach(async () => {
    memDb = await createMemDB([User, Transaction]);
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

  afterAll(() => memDb.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new transaction', async () => {
    const newTransaction: Transaction = Transaction.build({
      userId: 1,
      type: 'no_swipe_quota',
    });

    jest
      .spyOn(service, 'create')
      .mockImplementationOnce(() => Promise.resolve(newTransaction));

    expect(await service.create(1, 'no_swipe_quota')).toEqual(newTransaction);
  });
});
