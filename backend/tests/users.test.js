const express = require('express');
const request = require('supertest');
const users = require('../routes/users'); 

const app = express();
app.use('/', users); 

describe('GET /', () => {
  it('User route is working!', async () => {
    const response = await request(app).get('/'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User route is working!' });
  });
});
