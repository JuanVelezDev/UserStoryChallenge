// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const { client_id, user_id, products } = req.body;

      if (!client_id || !user_id || !products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Datos inválidos en la solicitud' });
      }

      const order = await OrderService.createOrder(client_id, user_id, products);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
