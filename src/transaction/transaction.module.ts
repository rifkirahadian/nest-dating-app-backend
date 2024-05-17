import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { transactionsProviders } from './transaction.provider';
import { UserService } from 'src/user/user.service';
import { usersProviders } from 'src/user/user.provider';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    ...transactionsProviders,
    UserService,
    ...usersProviders,
  ],
})
export class TransactionModule {}
