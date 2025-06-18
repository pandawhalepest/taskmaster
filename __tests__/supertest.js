//https://www.npmjs.com/package/supertest
//supertest to test make http requests to test api

const request = require('supertest');

const server = 'http://localhost:3000';

describe('/', () => {
  describe('GET', () => {
    it('responds with 200 status; text/html content type; API is running...', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .expect('API is running...');
    });
  });
});

describe('/api/task', () => {
  describe('POST', () => {
    it('responds with 200 status and application/json type', () => {
      return request(server)
        .post('/api/task')
        .send({ title: 'testTitle', description: 'testDescription' })
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('responds with posted task', () => {
      const testTask = { title: 'testTitle', description: 'testDescription' };
      return request(server)
        .post('/api/task')
        .send(testTask)
        .then((response) => {
          expect(response.body.title).toEqual('testTitle');
        });
    });
  });
});
