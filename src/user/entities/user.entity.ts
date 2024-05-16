import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  gender: string;

  @Column
  isVerified: boolean;

  @Column
  dailySwipeQuota: number;
}
