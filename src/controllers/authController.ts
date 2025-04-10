import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const signUp = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as { email: string; password: string };

  try {
    // The beforeCreate hook in the User model will hash the password.
    const user = await User.create({ email, password });
    return reply.code(201).send({ message: 'User created', userId: user.id });
  } catch (error) {
    console.error('Signup error:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as { email: string; password: string };
  const trimmedPassword = password.trim();

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Login error: user not found for email:', email);
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    console.log(`Login attempt for email: ${email}`);
    console.log(`Comparing provided password: "${trimmedPassword}"`);
    console.log(`With stored hash: "${user.password}"`);

    const valid = await user.comparePassword(trimmedPassword);
    console.log("Password valid?", valid);
    if (!valid) {
      console.error('Login error: password compare failed for email:', email);
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return reply.send({ token });
  } catch (error) {
    console.error('Login error:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export { signUp, login };
