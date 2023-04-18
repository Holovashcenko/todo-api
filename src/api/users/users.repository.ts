import knex from 'knex';
import { User } from './users.entity.js';
import bcrypt from 'bcrypt';

import config from '../../../knexfile.js'

const db = knex(config)

export const userRepository = {
  async getAll(): Promise<User[]> {
    return db.select('*').from('users');
  },

  async create(newUser: User): Promise<User> {
    const [user] = await db('users').insert(newUser).returning('*');
    return user;
  },

  async getById(id: number): Promise<User> {
    const [user] = await db.select('*').from('users').where({ id });
    return user;
  },

  async update(id: number, updatedUser: User): Promise<User> {
    await db('users').where({ id }).update(updatedUser);
    return await this.getById(id);
  },

  async delete(id: number): Promise<void> {
    await db('users').where({ id }).delete();
  },

  async comparePassword(id: number, password: string): Promise<boolean> {
    const [user] = await db.select('password').from('users').where({ id });
    return bcrypt.compare(password, user.password);
  }
};
