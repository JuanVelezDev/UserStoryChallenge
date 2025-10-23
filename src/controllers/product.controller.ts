import { Request, Response } from 'express';
import { Product } from '../models/products.model';

export class ProductController {
  // Create product
  static async createProduct(req: Request, res: Response) {
    try {
      const { code, name, description, price, stock } = req.body;

      // Validate if the code is unique
      const existing = await Product.findOne({ where: { code } });
      if (existing) {
        return res.status(400).json({ message: 'El código del producto ya existe' });
      }

      const product = await Product.create({ code, name, description, price, stock });
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get all products
  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get product by id
  static async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Update product
  static async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { code, name, description, price, stock } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      // Verify if the new code is already in use (by another product)
      if (code && code !== product.code) {
        const existing = await Product.findOne({ where: { code } });
        if (existing) {
          return res.status(400).json({ message: 'El código del producto ya está en uso' });
        }
      }

      await product.update({ code, name, description, price, stock });
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Delete product
  static async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      await product.destroy();
      return res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
