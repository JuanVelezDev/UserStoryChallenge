import { Request, Response } from 'express';
import { Client } from '../models/client.model';

export class ClientController {
  // Create client
  static async createClient(req: Request, res: Response) {
    try {
      const { name, email, phone } = req.body;

      // Validate required fields
      if (!name || !email) {
        return res.status(400).json({ message: 'Nombre y email son requeridos' });
      }

      // Validate unique email
      const existing = await Client.findOne({ where: { email } });
      if (existing) {
        return res.status(400).json({ message: 'El correo ya está registrado' });
      }

      const newClient = await Client.create({ name, email, phone });
      res.status(201).json(newClient);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get all clients
  static async getAllClients(req: Request, res: Response) {
    try {
      const clients = await Client.findAll();
      res.status(200).json(clients);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get client by id
  static async getClientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.status(200).json(client);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update client
  static async updateClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const client = await Client.findByPk(id);
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      await client.update({ name, email, phone });
      res.status(200).json(client);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete client
  static async deleteClient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);

      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }

      await client.destroy();
      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
