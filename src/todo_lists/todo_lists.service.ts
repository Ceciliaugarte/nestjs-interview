import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoListDto } from './dtos/create-todo_list';
import { UpdateTodoListDto } from './dtos/update-todo_list';
import { TodoList } from '../interfaces/todo_list.interface';

@Injectable()
export class TodoListsService {
  private readonly todolists: TodoList[];

  constructor(todoLists: TodoList[] = []) {
    this.todolists = todoLists ?? [];
  }

  all(): TodoList[] {
    return this.todolists;
  }

  get(id: number): TodoList {
    const todolist = this.todolists.find((list) => list.id == Number(id));
    if (!todolist) throw new NotFoundException(`Todo list not found`);
    return todolist;
  }

  create(dto: CreateTodoListDto): TodoList {
    const todoList: TodoList = {
      id: this.nextId(),
      name: dto.name,
      tasks: [],
    };

    this.todolists.push(todoList);

    return todoList;
  }

  update(id: number, dto: UpdateTodoListDto): TodoList {
    const todolist = this.todolists.find((list) => list.id == Number(id));
    if (!todolist) throw new NotFoundException(`Todo list not found`);

    todolist.name = dto.name;

    return todolist;
  }

  delete(id: number): void {
    const index = this.todolists.findIndex((list) => list.id == Number(id));

    if (index === -1) throw new NotFoundException(`Todo list not found`);
    this.todolists.splice(index, 1);
  }

  private nextId(): number {
    const last = this.todolists
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
