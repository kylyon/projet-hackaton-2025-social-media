const express = require('express');
const request = require('supertest');

// Mock de mongoose (juste pour éviter la connexion)
jest.mock('mongoose');

const roles = require('../../routes/roles/roles.js');

const app = express();
app.use(express.json());
app.use('/', roles);

describe('Role route is working! ', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});