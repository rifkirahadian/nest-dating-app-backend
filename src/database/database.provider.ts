import { Sequelize } from 'sequelize-typescript';
import { Swipe } from 'src/swipe/entities/swipe.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.db/data.sqlite3',
      });
      sequelize.addModels([User, Swipe, Transaction]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
