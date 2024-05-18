import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Transaction extends Model {
  @Column
  userId: number;

  @Column
  type: string;
}
