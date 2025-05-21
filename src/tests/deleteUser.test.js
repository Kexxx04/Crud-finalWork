const request = require('supertest');
const app = require('../index');

describe('DELETE /api/users/:id', () => {
  let userId;

  beforeAll(async () => {
    const res = await request(app).post('/api/users').send({
      name: 'Delete Me',
      email: `delete${Date.now()}@mail.com`,
      password: '123456'
    });
    userId = res.body.id;
  });

  it('Debería eliminar correctamente el usuario creado', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });

  it('Debería fallar si el usuario no existe', async () => {
    const res = await request(app).delete(`/api/users/999999`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/not found/i);
  });
});
