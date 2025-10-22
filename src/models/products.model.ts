import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderProduct } from './OrderProduct.model';

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT })
  description!: string;

  @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
  price!: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  stock!: number;

  @HasMany(() => OrderProduct)
  orderProducts!: OrderProduct[];
}
