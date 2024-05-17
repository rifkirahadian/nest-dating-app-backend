import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { SwipeModule } from './swipe/swipe.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [DatabaseModule, UserModule, SwipeModule, TransactionModule],
})
export class AppModule {}
