import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@Table
export class Transaction extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  type: string;
}
