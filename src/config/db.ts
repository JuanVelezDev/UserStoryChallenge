import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';


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
  models: [],
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