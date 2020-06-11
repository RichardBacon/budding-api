process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api/users/:user_id/plants', () => {
  test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
    const invalidMethods = ['put', 'patch', 'delete'];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]('/api/users/:user_id/plants')
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('method not allowed');
        });
    });

    return Promise.all(requests);
  });

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
              'plant_variety',
              'potHeight',
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

    test('status:200 - plants can be filtered by plant_type', () => {
      return request(app)
        .get('/api/users/1/plants?plant_type=indoor')
        .expect(200)
        .then(({ body: { plants } }) => {
          plants.forEach((plant) => {
            expect(plant.plant_type).toBe('indoor');
          });
        });
    });

    test('status:400 - invalid sort_by query - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/users/1/plants?sort_by=invalidQuery')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:400 - invalid order query - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/users/1/plants?order=invalidQuery')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .get('/api/users/7/plants')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:404 - invalid plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/users/notANumber/plants')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });

  describe('POST', () => {
    test('status 201 : responds with created plant object', () => {
      return request(app)
        .post('/api/users/1/plants')
        .send({
          plant_name: 'plant-name-test',
          plant_type: 'indoor',
          soil: 'soil-test',
          directSunlight: true,
          inside: false,
          wateringFreq: 2,
          plant_variety: 'tomato',
          potHeight: 10.5,
        })
        .expect(201)
        .then(({ body: { plant } }) => {
          expect(plant.plant_id).toBe(7);
          expect(plant.plant_name).toBe('plant-name-test');
          expect(plant.plant_type).toBe('indoor');
          expect(plant.plant_variety).toBe('tomato');
          expect(plant.potHeight).toBe('10.50');
          expect(plant.soil).toBe('soil-test');
          expect(plant.directSunlight).toBe(true);
          expect(plant.inside).toBe(false);
          expect(plant.wateringFreq).toBe(2);
          expect(plant.created_at).not.toBe('Invalid Date');
        });
    });
  });
});

describe('/api/plants/:plant_id', () => {
  test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
    const invalidMethods = ['get', 'post', 'put'];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]('/api/plants/:plant_id')
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('method not allowed');
        });
    });

    return Promise.all(requests);
  });

  describe('PATCH', () => {
    test('status:200 - responds with a patched plant object', () => {
      return request(app)
        .patch('/api/plants/1')
        .send({
          plant_name: 'plant-name-test-change',
          plant_type: 'vegetable',
          soil: 'soil-test-change',
          directSunlight: false,
          inside: true,
          wateringFreq: 4,
          plant_variety: 'tomato',
          potHeight: 10.5,
        })
        .expect(200)
        .then(({ body: { plant } }) => {
          expect(plant).toContainEntries([
            ['plant_id', 1],
            ['user_id', 1],
            ['plant_name', 'plant-name-test-change'],
            ['plant_type', 'vegetable'],
            ['soil', 'soil-test-change'],
            ['directSunlight', false],
            ['plant_variety', 'tomato'],
            ['potHeight', '10.50'],
            ['inside', true],
            ['wateringFreq', 4],
            ['created_at', new Date(1416140514171).toISOString()],
          ]);
        });
    });

    test('status:200 - responds with a patched plant object with one element updated', () => {
      return request(app)
        .patch('/api/plants/1')
        .send({
          potHeight: 15.5,
        })
        .expect(200)
        .then(({ body: { plant } }) => {
          expect(plant).toContainEntries([
            ['plant_id', 1],
            ['user_id', 1],
            ['plant_name', 'plantName1'],
            ['plant_type', 'indoor'],
            ['soil', 'soil1'],
            ['directSunlight', true],
            ['inside', false],
            ['wateringFreq', 2],
            ['plant_variety', 'potatoe'],
            ['potHeight', '15.50'],
            ['created_at', new Date(1416140514171).toISOString()],
          ]);
        });
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .patch('/api/plants/7')
        .expect(404)
        .send({
          plant_name: 'plant-name-test-change',
          plant_type: 'vegetable',
          soil: 'soil-test-change',
          directSunlight: false,
          inside: true,
          wateringFreq: 4,
        })
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:400 - invalid plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .patch('/api/plants/notANumber')
        .send({
          plant_name: 'plant-name-test-change',
          plant_type: 'vegetable',
          soil: 'soil-test-change',
          directSunlight: false,
          inside: true,
          wateringFreq: 4,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });

  describe('DELETE', () => {
    test('DELETE 204 - Removes plants by id', () => {
      return request(app).del('/api/plants/1').expect(204);
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .del('/api/plants/7')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:400 - invalid plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .del('/api/plants/notANumber')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
});
