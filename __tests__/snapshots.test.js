process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api/plants/:plant_id/snapshots', () => {
  describe('GET', () => {
    test('status:200 - responds with array of snapshot objects', () => {
      return request(app)
        .get('/api/plants/1/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(Array.isArray(snaps)).toBe(true);
          expect(snaps.length).toBe(2);
          snaps.map((snap) => {
            expect(snap.plant_id).toBe(1);
          });
        });
    });
    test('status:200 - responds with array of snapshot objects', () => {
      return request(app)
        .get('/api/plants/4/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(Array.isArray(snaps)).toBe(true);
          expect(snaps.length).toBe(2);
          snaps.map((snap) => {
            expect(snap.plant_id).toBe(4);
          });
        });
    });
    test('status:405 - invalid method - responds with msg: "method not allowed"', () => {
      const invalidMethods = ['patch', 'put', 'delete'];
      const requests = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/plants/4/snapshots')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });

      return Promise.all(requests);
    });

    test('status:404 - non-existent plant_id - responds with msg: "plant not found"', () => {
      return request(app)
        .get('/api/plants/100/snapshots')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });

    test('status:400 - non-existent plant_id - responds with msg: "bad request"', () => {
      return request(app)
        .get('/api/plants/notanumber/snapshots')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  describe('POST', () => {
    test('status:200 - responds with posted snapshot', () => {
      return request(app)
        .post('/api/plants/2/snapshots')
        .send({
          plant_id: 2,
          plant_uri: 'plantURIlink.jpg',
          no_leaves: 2,
          height: 8,
          created_at: 1416140518171,
        })
        .expect(200)
        .then(({ body: { snap } }) => {
          console.log(snap);
          expect(typeof snap).toBe('object');
          expect(snap.plant_id).toBe(2);
          expect(typeof snap.snapshot_id).toBe('number');
        });
    });
    test('status:400 - responds with bad request if missing required information', () => {
      return request(app)
        .post('/api/plants/2/snapshots')
        .send({
          plant_id: 2,
          plant_uri: 'plantURIlink.jpg',
          no_leaves: 2,
          created_at: 1416140518171,
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  describe('DELETE', () => {
    test.only('status:204 - deletes snapshot', () => {
      return request(app).delete('/api/snapshots/3').expect(204);
    });
  });
});
