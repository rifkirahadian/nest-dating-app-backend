import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/entities/user.entity';

@Table({
  tableName: 'swipes',
})
export class Swipe extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  userTargetId: number;

  @Column
  type: string;
}
