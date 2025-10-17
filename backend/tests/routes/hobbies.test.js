const express = require('express');
const request = require('supertest');

// Mock de mongoose (juste pour éviter la connexion)
jest.mock('mongoose');

const hobbies = require('../../routes/hobbies/hobbies.js');

const app = express();
app.use(express.json());
app.use('/', hobbies);

describe('Hobby route is working! ', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});