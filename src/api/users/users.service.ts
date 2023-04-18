import { User } from './users.entity';
import { userRepository } from './users.repository.js';

export const userService = {
  async getAll(): Promise<User[]> {
    return userRepository.getAll();
  },

  async create(newUser: User): Promise<User> {
    return userRepository.create(newUser);
  },

  async getById(id: number): Promise<User> {
    return userRepository.getById(id);
  },

  async update(id: number, updatedUser: User): Promise<User> {
    return userRepository.update(id, updatedUser);
  },

  async delete(id: number): Promise<void> {
    return userRepository.delete(id);
  },
};
