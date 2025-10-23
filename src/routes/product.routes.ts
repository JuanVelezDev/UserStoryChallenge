// src/routes/productRoutes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/products.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

router.post(
  '/',
  verifyToken,
  checkRole(['admin', 'vendedor']),
  ProductController.createProduct
);

router.get('/', verifyToken, ProductController.getAllProducts);

export default router;
