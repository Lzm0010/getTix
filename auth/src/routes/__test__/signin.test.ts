import request from 'supertest';
import {app} from '../../app';

it("fails when a email that dose not exist is supplied", async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passooo'
    })
    .expect(400);
})

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passoo'
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passyboi'
    })
    .expect(400);
})

it("allows a user to sign in with correct credentials and responds with cookie", async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'passyboi'
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'passyboi'
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
})