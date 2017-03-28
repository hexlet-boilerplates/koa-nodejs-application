import request from 'supertest';
import matchers from 'jest-supertest-matchers';

import app from '../src';

describe('requests', () => {
  const server = app().listen();

  beforeAll(() => {
    jasmine.addMatchers(matchers);
  });

  it('GET /', async () => {
    const res = await request.agent(server)
      .get('/');
    expect(res).toHaveHTTPStatus(200);
  });

  afterEach((done) => {
    server.close();
    done();
  });
});
