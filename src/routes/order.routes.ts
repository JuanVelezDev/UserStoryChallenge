// src/routes/order.routes.ts
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Only admin or vendor can create orders
router.post('/', verifyToken, checkRole(['admin', 'vendedor']), OrderController.createOrder);

// Get orders
router.get('/', verifyToken, checkRole(['admin', 'vendedor']), OrderController.getOrders);
export default router;
