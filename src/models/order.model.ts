import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany
  } from 'sequelize-typescript';
  import { Client } from './client.model';
  import { User } from './user.model';
  import { OrderProduct } from './OrderProduct.model';
  
  @Table({ tableName: 'orders', timestamps: false })
  export class Order extends Model {
    @ForeignKey(() => Client)
    @Column({ type: DataType.BIGINT })
    client_id!: number;
  
    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    user_id!: number;
  
    @Column({ type: DataType.DECIMAL(12, 2), defaultValue: 0 })
    total_amount!: number;
  
    @Column({ type: DataType.STRING, defaultValue: 'pending' })
    status!: string;
  
    @BelongsTo(() => Client)
    client!: Client;
  
    @BelongsTo(() => User)
    user!: User;
  
    @HasMany(() => OrderProduct)
    orderProducts!: OrderProduct[];
  }
  