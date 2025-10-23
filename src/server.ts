import express, { Application, Request, Response } from 'express';
import { sequelize } from './config/db';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import clientRoutes from './routes/client.routes';
import orderRoutes from './routes/order.routes';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // to read JSON in requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.json({ message: ' API SportsLine funcionando correctamente' });
});

// Connect to the database
(async () => {
  try {
    await sequelize.authenticate();
        console.log(' Conexión a PostgreSQL establecida correctamente');
    
    // synchronize the models with the database
    await sequelize.sync({ alter: true });
    console.log(' Modelos sincronizados correctamente');

    // Start server
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(' Error al iniciar la aplicación:', error);
  }
})();
