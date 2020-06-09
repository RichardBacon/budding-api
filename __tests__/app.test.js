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

  describe('/:user_id', () => {
    test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
      const invalidMethods = ['post', 'patch', 'put', 'delete'];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/users/1')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });

      return Promise.all(requests);
    });

    describe('GET', () => {
      test('status:200 - responds with requested user object', () => {
        return request(app)
          .get('/api/users/1')
          .expect(200)
          .then(({ body: { user } }) => {
            expect(user).toEqual({
              user_id: 1,
              username: 'butter_bridge',
              name: 'jonny',
              avatar_url:
                'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
              email: 'butter_bridge@email.com',
              password: 'abc123',
            });
          });
      });

      test('status:404 - non-existent username - responds with msg: "user not found"', () => {
        return request(app)
          .get('/api/users/100')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('user not found');
          });
      });

      test('status:400 - non-existent username - responds with msg: "bad request"', () => {
        return request(app)
          .get('/api/users/notanumber')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('bad request');
          });
      });
    });
  });
});
