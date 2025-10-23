// src/services/order.service.ts
import { Order } from '../models/order.model';
import { OrderProduct } from '../models/OrderProduct.model';
import { Product } from '../models/products.model';
import { Client } from '../models/client.model';
import { User } from '../models/user.model';

export class OrderService {
  static async createOrder(
    client_id: number,
    user_id: number,
    products: { product_id: number; quantity: number }[]
  ) {
    //  Validate client and user
    const client = await Client.findByPk(client_id);
    if (!client) throw new Error('Cliente no encontrado');

    const user = await User.findByPk(user_id);
    if (!user) throw new Error('Usuario no encontrado');

    // Calculate total and validate stock
    let totalAmount = 0;

    for (const item of products) {
      const product = await Product.findByPk(item.product_id);
      if (!product) throw new Error(`Producto ${item.product_id} no existe`);
      if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);

      totalAmount += Number(product.price) * item.quantity;
    }

    //  Create the order
    const order = await Order.create({
      client_id,
      user_id,
      total_amount: totalAmount,
      status: 'pending',
    });

    // Create the relationships and update stock
    for (const item of products) {
      const product = await Product.findByPk(item.product_id);
      if (!product) continue;

      await OrderProduct.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: product.price,
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    return await Order.findByPk(order.id, {
      include: [Client, User, OrderProduct],
    });
  }


  // Get orders
  static async getOrders(filters?: { client_id?: number; product_id?: number }) {
    const where: any = {};
    const include: any = [
      { model: Client },
      { model: User },
      { model: OrderProduct, include: [Product] },
    ];

    // Filter by client
    if (filters?.client_id) {
      where.client_id = filters.client_id;
    }

    // Filter by product (via many-to-many relationship)
    if (filters?.product_id) {
      include[2].where = { product_id: filters.product_id };
    }

    const orders = await Order.findAll({
      where,
      include,
      order: [['id', 'ASC']],
    });

    return orders;
  }
}

















