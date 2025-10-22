// src/services/authService.ts
import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateTokens } from '../utils/jwt';

export class AuthService {
  static async register(nombre: string, email: string, password: string, rol: string) {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('El correo ya está registrado');

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hashed, rol });

    const tokens = generateTokens({ id: user.id, rol: user.rol });
    return { user, ...tokens };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Contraseña incorrecta');

    const tokens = generateTokens({ id: user.id, rol: user.rol });
    return { user, ...tokens };
  }
}
