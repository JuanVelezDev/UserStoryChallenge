import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from '../models/user.model';
import { Client } from '../models/client.model';
import { OrderProduct } from '../models/OrderProduct.model';
import { Product } from '../models/products.model';
import { Order } from '../models/order.model';


dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  models: [User, Client, OrderProduct, Product, Order],
  logging: false,
});

//Connect DataBase
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(' Conectado a Supabase PostgreSQL correctamente');
  } catch (error) {
    console.error(' Error al conectar a Supabase:', error);
  }
};