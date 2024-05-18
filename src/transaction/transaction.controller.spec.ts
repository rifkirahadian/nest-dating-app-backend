import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { UserService } from '../user/user.service';
import { usersProviders } from '../user/user.provider';
import { transactionsProviders } from './transaction.provider';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/auth';

describe('TransactionController', () => {
  let controller: TransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [TransactionController],
      providers: [
        TransactionService,
        UserService,
        ...usersProviders,
        ...transactionsProviders,
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
