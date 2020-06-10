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

  describe('/api', () => {
    test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
      const invalidMethods = ['post', 'patch', 'put', 'delete'];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });

      return Promise.all(requests);
    });
  });
});
