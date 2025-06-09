import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

describe('TodoListsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoListsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todolists (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/todolists')
      .expect(200)
      .expect([]);
  });

  it('POST /todolists - should create a new list', () => {
    return request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Work' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Work');
      });
  });

  it('GET /todolists/:id - should get a list by ID', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Groceries' });

    const listId = createRes.body.id;

    const getRes = await request(app.getHttpServer())
      .get(`/api/todolists/${listId}`)
      .expect(200);

    expect(getRes.body.name).toBe('Groceries');
  });

  it('PUT /api/todolists/:id - should update a list', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Birthday party' });

    const listId = createRes.body.id;

    const updateRes = await request(app.getHttpServer())
      .put(`/api/todolists/${listId}`)
      .send({ name: 'Birthday party on Saturday' })
      .expect(200);

    expect(updateRes.body.name).toBe('Birthday party on Saturday');
  });

  it('DELETE /api/todolists/:id - should delete a list', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Weekend journey' });

    const listId = createRes.body.id;

    await request(app.getHttpServer())
      .delete(`/api/todolists/${listId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/todolists/${listId}`)
      .expect(404);
  });
});
