import fastify, { FastifyRegisterOptions } from 'fastify';
import dotenv from 'dotenv';
import { sequelize, testConnection } from './db/database';
import fastifyJwt from '@fastify/jwt';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(fastifyJwt, { 
  secret: process.env.JWT_SECRET || 'supersecret',
  sign: {
    expiresIn: '1h'
  }
});

// Add better error handling to the authenticate decorator
app.decorate('authenticate', async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ 
      error: 'Unauthorized',
      message: 'Invalid or expired token' 
    });
  }
});

app.register(authRoutes, { prefix: '/auth' });

const start = async () => {
  try {
    await testConnection();

    await sequelize.sync();
    await app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });
    console.log(`Server listening on port ${process.env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

export default app;
