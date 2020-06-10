process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

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

  describe('POST', () => {
    test('status 201 : responds with created user object', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          name: 'full name',
          avatar_url: 'avatar-url',
          email: 'email@mail.com',
          password: 'itsapassword',
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).toEqual({
            user_id: 4,
            username: 'unique-username',
            name: 'full name',
            avatar_url: 'avatar-url',
            email: 'email@mail.com',
            password: 'itsapassword',
          });
        });
    });

    test('status:400 - invalid body, missing username key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          name: 'full name',
          avatar_url: 'avatar-url',
          email: 'email@mail.com',
          password: 'itsapassword',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, missing name key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          avatar_url: 'avatar-url',
          email: 'email@mail.com',
          password: 'itsapassword',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, missing avatar_url key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          name: 'full name',
          email: 'email@mail.com',
          password: 'itsapassword',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, missing email key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          name: 'full name',
          avatar_url: 'avatar-url',
          password: 'itsapassword',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, missing password key - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'unique-username',
          name: 'full name',
          avatar_url: 'avatar-url',
          email: 'email@mail.com',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid body, existing username - responds with msg: "bad request"', () => {
      return request(app)
        .post('/api/users')
        .send({
          username: 'rogersop',
          name: 'full name',
          avatar_url: 'avatar-url',
          email: 'email@mail.com',
          password: 'itsapassword',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
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

      test('status:404 - non-existent user_id - responds with msg: "user not found"', () => {
        return request(app)
          .get('/api/users/100')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('user not found');
          });
      });

      test('status:400 - non-existent user_id - responds with msg: "bad request"', () => {
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
