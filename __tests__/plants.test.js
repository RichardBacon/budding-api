process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api/users/:user_id/plants', () => {
  describe('GET', () => {
    test('status:200 - responds with array of plant objects', () => {
      return request(app)
        .get('/api/users/1/plants')
        .expect(200)
        .then(({ body: { plants } }) => {
          expect(Array.isArray(plants)).toBe(true);
          expect(plants.length).toBe(2);
        });
    });

    test('status:200 - each plant object has required keys', () => {
      return request(app)
        .get('/api/users/1/plants')
        .expect(200)
        .then(({ body: { plants } }) => {
          plants.forEach((plant) => {
            expect(plant).toContainAllKeys([
              'plant_id',
              'plant_name',
              'user_id',
              'plant_type',
              'soil',
              'directSunlight',
              'inside',
              'wateringFreq',
              'created_at',
              'snapshot_count',
            ]);
          });
        });
    });

    test('status:200 - plants are sorted by created_at, descending by default', () => {
      return request(app)
        .get('/api/users/1/plants')
        .expect(200)
        .then(({ body: { plants } }) => {
          expect(plants).toBeSortedBy('created_at', {
            descending: true,
          });
        });
    });

    test('status:200 - plants can be sorted by created_at, ascending', () => {
      return request(app)
        .get('/api/users/1/plants?order=asc')
        .expect(200)
        .then(({ body: { plants } }) => {
          expect(plants).toBeSortedBy('created_at');
        });
    });

    test('status:200 - plants can be sorted by snapshot_count, descending', () => {
      return request(app)
        .get('/api/users/1/plants?sort_by=snapshot_count')
        .expect(200)
        .then(({ body: { plants } }) => {
          expect(plants).toBeSortedBy('snapshot_count', {
            descending: true,
          });
        });
    });

    test('status:200 - plants can be sorted by snapshot_count, ascending', () => {
      return request(app)
        .get('/api/users/1/plants?sort_by=snapshot_count&order=asc')
        .expect(200)
        .then(({ body: { plants } }) => {
          expect(plants).toBeSortedBy('snapshot_count');
        });
    });

    test('status:200 - each plant object has a snapshot_count key, value set to total count of comments with plant_id', () => {
      return request(app)
        .get('/api/users/1/plants')
        .expect(200)
        .then(({ body: { plants } }) => {
          plants.forEach((plant) => {
            expect(plant.snapshot_count).toEqual(expect.any(String));
          });
          expect(plants[0].snapshot_count).toBe('2');
        });
    });
  });
});

describe('/api/plants/:plant_id', () => {
  describe('GET', () => {
    test('status:200 - get single plant by plant_id', () => {
      return request(app)
        .get('/api/plants/1')
        .expect(200)
        .then(({ body: { plant } }) => {
          expect(plant.plant_id).toBe(1);
          expect(plant).toHaveProperty('soil');
        });
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .get('/api/plants/100')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:400 - non-existent plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/plants/notanumber')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
    return request(app)
      .post('/api/plants/1')
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe('method not allowed');
      });
  });
});
