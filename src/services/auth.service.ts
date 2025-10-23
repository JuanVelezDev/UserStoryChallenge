// src/services/authService.ts
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { RegisterDTO } from '../dtos/auth/register.dto';
import { LoginDTO } from '../dtos/auth/login.dto';
import { UserDAO } from '../daos/user.dao';

const userDAO = new UserDAO();

export class AuthService {
  // Register user
  static async register(nombre: string, email: string, password: string, rol: string) {
    const data: RegisterDTO = { nombre, email, password, rol };

    const existing = await userDAO.findByEmail(data.email);
    if (existing) throw new Error('El correo ya está registrado');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await userDAO.createUser({ ...data, password: hashed });

    const tokens = generateTokens({ id: user.id, rol: user.rol });
    return { user, ...tokens };
  }

  // Login user
  static async login(email: string, password: string) {
    const data: LoginDTO = { email, password };

    const user = await userDAO.findByEmail(data.email);
    if (!user) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    const tokens = generateTokens({ id: user.id, rol: user.rol });
    return { user, ...tokens };
  }

  // Refresh token
  static async refreshToken(token: string) {
    const decoded = verifyRefreshToken(token);

    const user = await userDAO.findById(decoded.id);
    if (!user) throw new Error('Usuario no encontrado');

    const tokens = generateTokens({ id: user.id, rol: user.rol });
    return { ...tokens };
  }
}
