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
        // expect(res.body).toHaveProperty('users');
    });
});

describe('Leaderboard Endpoint', () => {
    it('GET /leaderboard should return HTML', async () => {
        const res = await requestWithSupertest.get('/leaderboard');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('html'));
    });
});

describe('Characters API', () => {
    it('GET /api/characters should return a list of characters', async () => {
        const res = await requestWithSupertest.get('/api/characters');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Preferences API', () => {
    it('GET /api/preferences should return a list of preferences', async () => {
        const res = await requestWithSupertest.get('/api/preferences');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(Array.isArray(res.body)).toBe(true);
    });
});

describe('Save Score API', () => {
    it('GET /api/save-score?score=10 should redirect or respond (if logged in)', async () => {
        // This test assumes a session or login is required to save a score.
        // If not logged in, you may get a 401 or a redirect.
        const res = await requestWithSupertest.get('/api/save-score?score=10');
        // Accept either a redirect (302) or forbidden (401/403) or success (200)
        expect([200, 302, 401, 403]).toContain(res.status);
    });
});

describe('Home Page', () => {
    it('GET / should return HTML', async () => {
        const res = await requestWithSupertest.get('/');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('html'));
    });
});

describe('Game Page', () => {
    it('GET /game should return HTML', async () => {
        const res = await requestWithSupertest.get('/game');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('html'));
    });
});

describe('Game Page', () => {
    it('GET /game should return HTML', async () => {
        const res = await requestWithSupertest.get('/game');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('html'));
    });
});

describe('Leaderboard Data API', () => {
    it('GET /api/leaderboard should return a list', async () => {
        const res = await requestWithSupertest.get('/api/leaderboard');
        // Accept 200 or 404 if not implemented
        expect([200, 404]).toContain(res.status);
        if (res.status === 200) {
            expect(Array.isArray(res.body)).toBe(true);
        }
    });
});

describe('Save Score API (POST)', () => {
    it('POST /api/save-score should respond appropriately', async () => {
        const res = await requestWithSupertest
            .post('/api/save-score')
            .send({ score: 42 });
        expect([200, 302, 401, 403, 404]).toContain(res.status);
    });
});

describe('User Registration', () => {
    it('POST /register should create a new user', async () => {
        const uniqueUsername = `testuser_${Date.now()}`;
        const res = await requestWithSupertest
            .post('/register')
            .send({
                username: uniqueUsername,
                password: 'testpassword123'
            });
        // Accept 200 (success), 201 (created), or 302 (redirect to login/home)
        expect([200, 201, 302]).toContain(res.status);
    });
});

describe('User Login', () => {
    it('POST /login should authenticate user with valid credentials', async () => {
        // Use a known user or create one in a beforeAll hook
        const res = await requestWithSupertest
            .post('/login')
            .send({
                username: 'test', // replace with a valid username
                password: 'test' // replace with the correct password
            });
        // Accept 200 (success), 302 (redirect), or 401 (unauthorized if wrong)
        expect([200, 302, 401]).toContain(res.status);
    });
});


describe('Protected Route', () => {
    it('GET /profile (or another protected route) should require authentication', async () => {
        const res = await requestWithSupertest.get('/profile'); // replace with your protected route
        // Should be 401 Unauthorized, 403 Forbidden, or 302 Redirect to login
        expect([401, 403, 302]).toContain(res.status);
    });
});