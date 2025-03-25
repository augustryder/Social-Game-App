const { app, server } = require('../app');
const supertest = require('supertest');
const requestWithSupertest = supertest(app);
const pool = require('../models/database'); // Import the database pool

afterAll(async () => {
    await pool.end(); // Close the database connection pool
    server.close();
});

describe('Users Endpoint', () => {
    it('GET /users should show all users', async () => {
        const res = await requestWithSupertest.get('/users');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        //expect(res.body).toHaveProperty('users')
    });
});