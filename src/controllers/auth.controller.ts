// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { verifyRefreshToken, generateTokens } from '../utils/jwt';
// Auth controller
export class AuthController {
  // Register user
  static async register(req: Request, res: Response) {
    try {
      const { nombre, email, password, rol } = req.body;
      const result = await AuthService.register(nombre, email, password, rol);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Login user
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Refresh token
  static async refresh(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({ message: 'El refresh token es requerido' });
      }

      // Verify if the refreshToken is valid
      const decoded = verifyRefreshToken(refreshToken);

      // Generate new tokens based on the payload
      const tokens = generateTokens({ id: decoded.id, rol: decoded.rol });  

      return res.status(200).json(tokens);
    } catch (error: any) {
      return res.status(401).json({ message: error.message || 'Token inválido o expirado' });
    }
  }
}
