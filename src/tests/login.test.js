const request = require('supertest');
const app = require('../index');

describe('POST /api/users/login', () => {
  const testEmail = `login${Date.now()}@mail.com`;
  const testPassword = '123456';

  beforeAll(async () => {
    await request(app).post('/api/users').send({
      name: 'Login Tester',
      email: testEmail,
      password: testPassword
    });
  });

  it('Debería loguearse correctamente con credenciales válidas', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('Debería fallar con una contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid/i);
  });
});
