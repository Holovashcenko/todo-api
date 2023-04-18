import { FastifyReply, FastifyRequest } from 'fastify';
import { User } from './users.entity.js';
import { userService } from './users.service.js';

export const userController = {
  async getAll(req: FastifyRequest, res: FastifyReply): Promise<User[]> {
    const users = await userService.getAll();
    return res.send(users);
  },

  async create(req: FastifyRequest<{ Body: User }>, res: FastifyReply): Promise<User> {
    const { body } = req;
    const newUser = await userService.create(body);
    return res.send(newUser);
  },

  async getById(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply): Promise<User> {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.send(user);
  },

  async update(req: FastifyRequest<{ Params: { id: number }; Body: User }>, res: FastifyReply): Promise<User> {
    const { id } = req.params;
    const { body } = req;
    const updatedUser = await userService.update(id, body);
    return res.send(updatedUser);
  },

  async delete(req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply): Promise<void> {
    const { id } = req.params;
    await userService.delete(id);
    return res.send();
  },
};