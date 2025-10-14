const request = require('supertest');

// Mock de la connexion à la base de données
jest.mock('../utils/dbhandler', () => {
    return jest.fn().mockImplementation(() => ({
        connect: jest.fn(), // on neutralise la connexion
    }));
});

const app = require('../app'); 

describe('GET /', () => {

  it('API Hackathon 2025 is running', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'API Hackathon 2025 is running', status: '200' });
  });
});

