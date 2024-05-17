import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTIONS_REPOSITORY')
    private transactionsRepository: typeof Transaction,
    private userService: UserService,
  ) {}

  create(userId: number, type: string) {
    return this.transactionsRepository.create({
      userId,
      type,
    });
  }

  async validateExistTransaction(userId: number, type: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: { userId, type },
    });
    if (transaction) {
      throw new BadRequestException(`You've do this transaction before`);
    }
  }

  async updateUserTransaction(type: string, userId: number) {
    if (type === 'no_swipe_quota') {
      await this.userService.updateDailySwipeQuota(userId);
    }

    if (type === 'verified_label') {
      await this.userService.updateVerified(userId);
    }
  }
}
