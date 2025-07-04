import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemsController } from './todo_items.controller';
import { TodoItemsService } from './todo_items.service';
import { TodoListsService } from '../todo_lists/todo_lists.service';

describe('TodoItemsController', () => {
  let todoItemservice: TodoItemsService;
  let todoItemsController: TodoItemsController;

  const mockTodoListsService = {
    get: jest.fn((id: number) => {
      if (id === 1) {
        return { id: 1, name: 'List 1', items: [] };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    todoItemservice = new TodoItemsService(mockTodoListsService as any);

    (todoItemservice as any).todoItems = [
      { id: 1, description: 'test1', todoListId: 1, completed: false },
      { id: 2, description: 'test2', todoListId: 1, completed: false },
    ];

    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoItemsController],
      providers: [
        {
          provide: TodoListsService,
          useValue: mockTodoListsService,
        },
        { provide: TodoItemsService, useValue: todoItemservice },
      ],
    }).compile();

    todoItemsController = app.get<TodoItemsController>(TodoItemsController);
  });

  describe('index', () => {
    it('should return the todoItems of a list', () => {
      expect(todoItemsController.index({ todoListId: 1 })).toEqual([
        { id: 1, description: 'test1', todoListId: 1, completed: false },
        { id: 2, description: 'test2', todoListId: 1, completed: false },
      ]);
    });
  });

  describe('show', () => {
    it('should return the todoItem with the given id', () => {
      expect(todoItemsController.show({ todoItemId: 1 })).toEqual({
        id: 1,
        description: 'test1',
        todoListId: 1,
        completed: false,
      });
    });
  });

  describe('update', () => {
    it('should update the todoItem with the given id', () => {
      expect(
        todoItemsController.update(
          { todoItemId: 1 },
          { description: 'modified' },
        ),
      ).toEqual({
        id: 1,
        description: 'modified',
        todoListId: 1,
        completed: false,
      });

      expect(todoItemservice.get(1).description).toEqual('modified');
    });
  });

  describe('complete', () => {
    it('should mark the todoItem as completed', () => {
      const result = todoItemsController.complete({ todoItemId: 1 });

      expect(result).toEqual({
        id: 1,
        description: 'test1',
        todoListId: 1,
        completed: true,
      });

      expect(todoItemservice.get(1).completed).toBe(true);
    });
  });

  describe('create', () => {
    it('should create a new todoItem', () => {
      expect(
        todoItemsController.create({ description: 'new', todoListId: 1 }),
      ).toEqual({
        id: 3,
        description: 'new',
        todoListId: 1,
        completed: false,
      });

      expect(todoItemservice.all(1).length).toBe(3);
    });
  });

  describe('delete', () => {
    it('should delete the todoItem with the given id', () => {
      expect(() => todoItemsController.delete({ todoItemId: 1 })).not.toThrow();

      expect(todoItemservice.all(1).map((x) => x.id)).toEqual([2]);
    });
  });
});
