import { Transaction } from './entities/transaction.entity';

export const transactionsProviders = [
  {
    provide: 'TRANSACTIONS_REPOSITORY',
    useValue: Transaction,
  },
];
