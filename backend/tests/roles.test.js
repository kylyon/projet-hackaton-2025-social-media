const express = require('express');
const request = require('supertest');
const roles = require('../routes/users/roles'); 

const app = express();
app.use('/', roles); 

describe('GET /', () => {
  it('Role route is working!', async () => {
    const response = await request(app).get('/'); 

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Role route is working", status: "200" });
  });
});
