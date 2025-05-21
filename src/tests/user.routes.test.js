const request = require('supertest');
const express = require('express');
const app = require('../index');

// Usamos una ruta de prueba para el POST /api/users
describe('POST /api/users', () => {
  it('Debería registrar un nuevo usuario correctamente', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'testuser',
        email: `test${Date.now()}@mail.com`, // para evitar duplicados
        password: '123456'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('name');
  });

  it('Debería fallar si el correo ya existe', async () => {
    const emailExistente = `duplicate${Date.now()}@mail.com`;

    // Primer registro
    await request(app)
      .post('/api/users')
      .send({
        name: 'duplicate',
        email: emailExistente,
        password: '123456'
      });

    // Segundo intento con el mismo email
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'otro',
        email: emailExistente,
        password: '123456'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/correo/i);
  });
  
});
// ✅ Agregado para evitar warning de Jest
afterAll(async () => {
await new Promise(resolve => setTimeout(resolve, 500));
});