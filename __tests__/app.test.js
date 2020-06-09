process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/', () => {
  describe('GET', () => {
    test('status:404 - invalid route - responds with msg: "resource not found"', () => {
      return request(app)
        .get('/nowhere')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('resource not found');
        });
    });
  });
});

describe('/users', () => {
  test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
    const invalidMethods = ['patch', 'put', 'delete'];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]('/api/users')
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('method not allowed');
        });
    });

    return Promise.all(requests);
  });

  describe('GET', () => {
    test('status:200 - responds with array of user objects', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          expect(Array.isArray(users)).toBe(true);
          expect(users.length).toBe(3);
        });
    });

    test('status:200 - each user object has required keys', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body: { users } }) => {
          users.forEach((user) => {
            expect(user).toContainAllKeys([
              'user_id',
              'username',
              'name',
              'avatar_url',
              'email',
              'password',
            ]);
          });
        });
    });
  });
});
