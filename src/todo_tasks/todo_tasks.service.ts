import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoTaskDto } from './dtos/create-todo_task';
import { UpdateTodoTaskDto } from './dtos/update-todo_task';
import { TodoTask } from 'src/interfaces/todo_task.interface';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class TodoTasksService {
  private readonly todoTasks: TodoTask[] = [];

  constructor(private readonly todoListsService: TodoListsService) {}

  all(): TodoTask[] {
    return this.todoTasks;
  }

  get(id: number): TodoTask {
    const todoTask = this.todoTasks.find((Task) => Task.id === Number(id));
    if (!todoTask) throw new NotFoundException(`Todo Task not found`);
    return todoTask;
  }

  create(dto: CreateTodoTaskDto): TodoTask {
    const todoTask: TodoTask = {
      id: this.nextId(),
      description: dto.description,
      completed: false,
      todoListId: dto.todoListId,
    };

    const todoList = this.todoListsService.get(dto.todoListId);
    if (!todoList)
      throw new NotFoundException(`Error creating task, Todo list not found`);

    this.todoTasks.push(todoTask);
    todoList.tasks.push(todoTask);
    return todoTask;
  }

  update(id: number, dto: UpdateTodoTaskDto): TodoTask {
    const todoTask = this.todoTasks.find((Task) => Task.id == Number(id));
    if (!todoTask) throw new NotFoundException(`Todo Task not found`);

    todoTask.description = dto.description;
    todoTask.completed = dto.completed;

    return todoTask;
  }

  delete(id: number): void {
    const index = this.todoTasks.findIndex((Task) => Task.id == Number(id));

    if (index === -1) throw new NotFoundException(`Todo Task not found`);
    this.todoTasks.splice(index, 1);
  }

  private nextId(): number {
    const last = this.todoTasks
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
