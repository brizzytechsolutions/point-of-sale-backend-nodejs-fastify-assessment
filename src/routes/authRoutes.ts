// src/routes/authRoutes.ts
import { FastifyInstance } from 'fastify';
import { signUp, login } from '../controllers/authController';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', signUp);
  fastify.post('/login', login);
}
