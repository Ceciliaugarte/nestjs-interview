import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoItemDto } from './dtos/create-todo_Item';
import { UpdateTodoItemDto } from './dtos/update-todo_Item';
import { TodoItem } from 'src/interfaces/todo_item.interface';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';

@Injectable()
export class TodoItemsService {
  private readonly todoItems: TodoItem[] = [];

  constructor(private readonly todoListsService: TodoListsService) {}

  all(listId: number): TodoItem[] {
    const currentList = this.todoListsService.get(listId);
    if (!currentList) throw new NotFoundException(`Todo List not found`);
    const listItems = this.todoItems.filter(
      (item) => item.todoListId == Number(listId),
    );
    return listItems;
  }

  get(id: number): TodoItem {
    const todoItem = this.todoItems.find((Item) => Item.id === Number(id));
    if (!todoItem) throw new NotFoundException(`Todo Item not found`);
    return todoItem;
  }

  create(dto: CreateTodoItemDto): TodoItem {
    const todoItem: TodoItem = {
      id: this.nextId(),
      description: dto.description,
      completed: false,
      todoListId: Number(dto.todoListId),
    };

    const todoList = this.todoListsService.get(dto.todoListId);
    if (!todoList)
      throw new NotFoundException(`Error creating Item, Todo list not found`);

    this.todoItems.push(todoItem);
    todoList.items.push(todoItem);
    return todoItem;
  }

  update(id: number, dto: UpdateTodoItemDto): TodoItem {
    const todoItem = this.todoItems.find((Item) => Item.id == Number(id));
    if (!todoItem) throw new NotFoundException(`Todo Item not found`);

    if (dto.description) todoItem.description = dto.description;
    if (dto.completed !== undefined) {
      todoItem.completed = dto.completed;
    }
    return todoItem;
  }

  markAsCompleted(id: number): TodoItem {
    const todoItem = this.todoItems.find((item) => item.id === Number(id));
    if (!todoItem) throw new NotFoundException('Todo Item not found');
    todoItem.completed = true;
    return todoItem;
  }

  delete(id: number): void {
    const index = this.todoItems.findIndex((Item) => Item.id == Number(id));
    const item = this.todoItems[index];
    const todoList = this.todoListsService.get(item.todoListId);
    if (todoList) {
      todoList.items = todoList.items.filter((i) => i.id !== item.id);
    }
    if (index === -1) throw new NotFoundException(`Todo Item not found`);
    this.todoItems.splice(index, 1);
  }

  private nextId(): number {
    const last = this.todoItems
      .map((x) => x.id)
      .sort()
      .reverse()[0];

    return last ? last + 1 : 1;
  }
}
