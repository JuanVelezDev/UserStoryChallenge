import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo
  } from 'sequelize-typescript';
  import { User } from './user.model';
  
  @Table({ tableName: 'refresh_tokens', timestamps: false })
  export class RefreshToken extends Model {
    @ForeignKey(() => User)
    @Column({ type: DataType.BIGINT })
    user_id!: number;
  
    @Column({ type: DataType.TEXT, allowNull: false })
    token!: string;
  
    @Column({ type: DataType.DATE, allowNull: false })
    expires_at!: Date;
  
    @BelongsTo(() => User)
    user!: User;
  }
  