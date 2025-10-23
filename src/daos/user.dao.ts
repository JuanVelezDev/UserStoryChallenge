import { User } from '../models/user.model';

export class UserDAO {
  async createUser(data: any) {
    return await User.create(data);
  }

  async findByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async updateUser(id: number, data: any) {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id: number) {
    return await User.destroy({ where: { id } });
  }
}
