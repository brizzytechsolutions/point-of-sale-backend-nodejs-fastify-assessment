import app from '../app';
import supertest from 'supertest';

describe('Auth Endpoints', () => {
  it('should sign up a user', async () => {
    const res = await supertest(app.server)
      .post('/auth/signup')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('userId');
  });

  it('should log in a user', async () => {
    const res = await supertest(app.server)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
