import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoItemsModule } from 'src/todo_items/todo_items.module';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

describe('TodoItemsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoItemsModule, TodoListsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todoitems/list/:todolistId - should return all the items from a list (GET)', async () => {
    const list = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Groceries' });

    const listId = list.body.id;

    await request(app.getHttpServer()).post('/api/todoitems').send({
      description: 'Buy eggs',
      todoListId: listId,
    });

    const res = await request(app.getHttpServer())
      .get(`/api/todoitems/list/${listId}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].description).toBe('Buy eggs');
  });

  it('POST /todoitems - should create a new item in a list', async () => {
    const list = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Groceries' });

    const itemRes = await request(app.getHttpServer())
      .post('/api/todoitems')
      .send({
        description: 'Buy milk',
        todoListId: list.body.id,
      })
      .expect(201);

    expect(itemRes.body.description).toBe('Buy milk');
    expect(itemRes.body.completed).toBe(false);
  });

  it('GET /todoitems/:id - should get an item by ID', async () => {
    const listRes = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Groceries' });

    const listId = listRes.body.id;

    const itemRes = await request(app.getHttpServer())
      .post('/api/todoitems')
      .send({
        description: 'Buy bread',
        todoListId: listId,
      });

    const itemId = itemRes.body.id;

    const getRes = await request(app.getHttpServer())
      .get(`/api/todoitems/${itemId}`)
      .expect(200);

    expect(getRes.body.description).toBe('Buy bread');
  });

  it('PUT /todoitems/:id - should update an item', async () => {
    const list = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Daily Tasks' });

    const item = await request(app.getHttpServer())
      .post('/api/todoitems')
      .send({
        description: 'Do the laundry',
        todoListId: list.body.id,
      });

    const updatedItem = await request(app.getHttpServer())
      .put(`/api/todoitems/${item.body.id}`)
      .send({
        description: 'Do the laundry and ironing',
        completed: true,
      })
      .expect(200);

    expect(updatedItem.body.description).toBe('Do the laundry and ironing');
    expect(updatedItem.body.completed).toBe(true);
  });

  it('PATCH /todoitems/:id/complete - should mark an item as completed', async () => {
    const list = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Tasks' });

    const item = await request(app.getHttpServer())
      .post('/api/todoitems')
      .send({
        description: 'Walk the dog',
        todoListId: list.body.id,
      });

    const res = await request(app.getHttpServer())
      .patch(`/api/todoitems/${item.body.id}/complete`)
      .expect(200);

    expect(res.body.completed).toBe(true);
    expect(res.body.description).toBe('Walk the dog');
  });

  it('DELETE /todoitems/:id - should delete an item', async () => {
    const list = await request(app.getHttpServer())
      .post('/api/todolists')
      .send({ name: 'Chores' });

    const item = await request(app.getHttpServer())
      .post('/api/todoitems')
      .send({
        description: 'Clean room',
        todoListId: list.body.id,
      });

    await request(app.getHttpServer())
      .delete(`/api/todoitems/${item.body.id}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/api/todoitems/${item.body.id}`)
      .expect(404);
  });
});
