import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken, checkRole } from '../middlewares/auth.middleware';

const router = Router();

// Create product (only admin or vendor)
router.post(
  '/',
  verifyToken,
  checkRole(['admin', 'vendedor']),
  ProductController.createProduct
);

// Get all products (any authenticated user)
router.get('/', verifyToken, ProductController.getAllProducts);

// Get product by id (any authenticated user)
router.get('/:id', verifyToken, ProductController.getProductById);

    // Update product (only admin or vendor)
router.put(
  '/:id',
  verifyToken,
  checkRole(['admin', 'vendedor']),
  ProductController.updateProduct
);

// Delete product (only admin)
router.delete(
  '/:id',
  verifyToken,
  checkRole(['admin']),
  ProductController.deleteProduct   
);

export default router;

