import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { Order } from './order.model';
  import { Product } from './products.model';
  
  @Table({ tableName: 'order_products', timestamps: false })
  export class OrderProduct extends Model {
    @ForeignKey(() => Order)
    @Column({ type: DataType.BIGINT })
    order_id!: number;
  
    @ForeignKey(() => Product)
    @Column({ type: DataType.BIGINT })
    product_id!: number;
  
    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;
  
    @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
    unit_price!: number;
  
    @BelongsTo(() => Order)
    order!: Order;
  
    @BelongsTo(() => Product)
    product!: Product;
  }
  