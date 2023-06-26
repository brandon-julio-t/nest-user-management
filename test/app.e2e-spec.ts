import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from '../src/users/contracts/user.interface';
import { UsersService } from '../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [UsersService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    user = {
      id: 'id',
      name: 'name',
      email: 'test@email.com',
      age: 0,
      address: 'address',
    };

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/users (POST) 400 - Bad Request', () => {
    return request(app.getHttpServer())
      .post('/users')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/users (POST) 201 - Created', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);
  });

  it('/users/id (PUT) 400 - Bad Request', () => {
    return request(app.getHttpServer())
      .put('/users/id')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/users/dummy-id (PUT) 404 - Not Found', () => {
    return request(app.getHttpServer())
      .put('/users/dummy-id')
      .send(user)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/users/id (PUT) 200 - OK', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);

    return request(app.getHttpServer())
      .put(`/users/${response.body.id}`)
      .send(response.body)
      .expect(HttpStatus.OK);
  });

  it('/users/dummy-id (DELETE) 404 - Not Found', () => {
    return request(app.getHttpServer())
      .delete('/users/dummy-id')
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/users/id (DELETE) 200 - OK', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .send(user)
      .expect(HttpStatus.CREATED);

    return request(app.getHttpServer())
      .delete(`/users/${response.body.id}`)
      .expect(HttpStatus.OK);
  });
});
