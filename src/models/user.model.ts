import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order } from './order.model';
import { RefreshToken } from './RefreshToken';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, defaultValue: 'vendedor' })
  role!: string;

  @HasMany(() => Order)
  orders!: Order[];

  @HasMany(() => RefreshToken)
  tokens!: RefreshToken[];
}
