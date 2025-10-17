const express = require('express');
const request = require('supertest');

// Mock de mongoose (juste pour éviter la connexion)
jest.mock('mongoose');

const comments = require('../../routes/comments/comments.js');

const app = express();
app.use(express.json());
app.use('/', comments);

describe('Comment route is working! ', () => {
  it('GET /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

});