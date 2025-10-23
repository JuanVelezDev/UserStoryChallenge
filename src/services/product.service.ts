import { Product } from '../models/products.model';

export class ProductService {
  // Crear producto
  static async createProduct(
    code: string,
    name: string,
    description: string,
    price: number,
    stock: number
  ) {
    const exists = await Product.findOne({ where: { code } });
    if (exists) throw new Error('El código del producto ya existe');

    const product = await Product.create({ code, name, description, price, stock });
    return product;
  }

  // Get all products
  static async getAllProducts() {
    return await Product.findAll();
  }

  // Get product by id
  static async getProductById(id: number) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');
    return product;
  }

  // Update product
  static async updateProduct(id: number, data: any) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');

    if (data.code) {
      const exists = await Product.findOne({ where: { code: data.code } });
      if (exists && exists.id !== id) throw new Error('El código ya está en uso por otro producto');
    }

    await product.update(data);
    return product;
  }

  // Delete product
  static async deleteProduct(id: number) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Producto no encontrado');

    await product.destroy();
    return { message: 'Producto eliminado correctamente' };
  }
}
