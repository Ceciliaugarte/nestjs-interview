import { Test, TestingModule } from '@nestjs/testing';
import { TodoTasksController } from './todo_tasks.controller';
import { TodoTasksService } from './todo_tasks.service';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

describe('TodoTasksController', () => {
  let todoTaskService: TodoTasksService;
  let todoTasksController: TodoTasksController;

  const mockTodoListsService = {
    get: jest.fn((id: number) => {
      if (id === 1) {
        return { id: 1, name: 'List 1', tasks: [] };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    todoTaskService = new TodoTasksService(
      mockTodoListsService as any /* , [
      { id: 1, description: 'test1', todoListId: 1, completed: false },
      { id: 2, description: 'test2', todoListId: 2, completed: false },
    ] */,
    );

    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoTasksController],
      providers: [
        {
          provide: TodoListsService,
          useValue: mockTodoListsService,
        },
        { provide: TodoTasksService, useValue: todoTaskService },
      ],
    }).compile();

    todoTasksController = app.get<TodoTasksController>(TodoTasksController);
  });

  describe('index', () => {
    it('should return the list of todoTasks', () => {
      expect(todoTasksController.index()).toEqual([
        { id: 1, description: 'test1', todoListId: 1, completed: false },
        { id: 2, description: 'test2', todoListId: 2, completed: false },
      ]);
    });
  });

  describe('show', () => {
    it('should return the todoTask with the given id', () => {
      expect(todoTasksController.show({ todoTaskId: 1 })).toEqual({
        id: 1,
        description: 'test1',
        todoListId: 1,
        completed: false,
      });
    });
  });

  describe('update', () => {
    it('should update the todoTask with the given id', () => {
      expect(
        todoTasksController.update(
          { todoTaskId: 1 },
          { description: 'modified' },
        ),
      ).toEqual({
        id: 1,
        description: 'modified',
        todoListId: 1,
        completed: false,
      });

      expect(todoTaskService.get(1).description).toEqual('modified');
    });
  });

  describe('create', () => {
    it('should create a new todoTask', () => {
      expect(
        todoTasksController.create({ description: 'new', todoListId: 1 }),
      ).toEqual({
        id: 3,
        description: 'new',
        todoListId: 1,
        completed: false,
      });

      expect(todoTaskService.all().length).toBe(3);
    });
  });

  describe('delete', () => {
    it('should delete the todoTask with the given id', () => {
      expect(() => todoTasksController.delete({ todoTaskId: 1 })).not.toThrow();

      expect(todoTaskService.all().map((x) => x.id)).toEqual([2]);
    });
  });
});
