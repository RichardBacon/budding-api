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
          snaps.forEach((snap) => {
            expect(snap.plant_id).toBe(1);
          });
        });
    });
    test('status:200 - responds with array of snapshot objects', () => {
      return request(app)
        .get('/api/plants/1/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(Array.isArray(snaps)).toBe(true);
          expect(snaps.length).toBe(2);
          snaps.forEach((snap) => {
            expect(snap.plant_id).toBe(1);
          });
        });
    });

    test('status:200 - snaps are sorted by date (default), descending', () => {
      return request(app)
        .get('/api/plants/4/snapshots')
        .expect(200)
        .then(({ body: { snaps } }) => {
          expect(snaps).toBeSortedBy('created_at', {
            descending: true,
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
          plant_uri: 'plantURIlink.jpg',
          height: 8.5,
        })
        .expect(200)
        .then(({ body: { snap } }) => {
          expect(typeof snap).toBe('object');
          expect(snap.plant_id).toBe(2);
          expect(typeof snap.snapshot_id).toBe('number');
        });
    });
    test('status:400 - responds with bad request if missing required information', () => {
      return request(app)
        .post('/api/plants/2/snapshots')
        .send({
          plant_uri: 'plantURIlink.jpg',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('status:404 - responds with plant not found if plant does not exist', () => {
      return request(app)
        .post('/api/plants/1000/snapshots')
        .send({
          height: 5,
          plant_uri: 'plantURIlink.jpg',
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('plant not found');
        });
    });
    test('status:400 - responds with bad request if invalid plant_id', () => {
      return request(app)
        .post('/api/plants/notanumber/snapshots')
        .send({
          height: 5,
          plant_uri: 'plantURIlink.jpg',
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
  });
  test('405: invalid method', () => {
    const invalidMethods = ['patch', 'put', 'delete'];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]('/api/plants/1/snapshots')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).toBe('method not allowed');
        });
    });
    return Promise.all(methodPromises);
  });
});
describe('/api/snapshots/:snapshot_id', () => {
  describe('DELETE', () => {
    test('status:204 - deletes snapshot', () => {
      return request(app).delete('/api/snapshots/3').expect(204);
    });
    test('status:404 - snapshot not found', () => {
      return request(app)
        .delete('/api/snapshots/1000')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('snapshot not found');
        });
    });
    test('status:400 - response with bad request if invalid snapshot_id', () => {
      return request(app)
        .delete('/api/snapshots/notanumber')
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('bad request');
        });
    });
    test('405: invalid method', () => {
      const invalidMethods = ['get', 'post', 'patch', 'put'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api/snapshots/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
