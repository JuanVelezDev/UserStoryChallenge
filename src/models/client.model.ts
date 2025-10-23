import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Order} from './order.model';

@Table({ tableName: 'clients', timestamps: false })
export class Client extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING })
  phone!: string;

  @HasMany(() => Order)
  orders!: Order[];
}
