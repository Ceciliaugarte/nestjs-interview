import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dtos/create-todo_Item';
import { UpdateTodoItemDto } from './dtos/update-todo_Item';
import { TodoItem } from 'src/interfaces/todo_item.interface';
import { TodoItemsService } from './todo_items.service';

@Controller('api/todoItems')
export class TodoItemsController {
  constructor(private todoItemsService: TodoItemsService) {}

  @Get()
  index(): TodoItem[] {
    return this.todoItemsService.all();
  }

  @Get('/:todoItemId')
  show(@Param() param: { todoItemId: number }): TodoItem {
    return this.todoItemsService.get(param.todoItemId);
  }

  @Post()
  create(@Body() dto: CreateTodoItemDto): TodoItem {
    return this.todoItemsService.create(dto);
  }

  @Put('/:todoItemId')
  update(
    @Param() param: { todoItemId: number },
    @Body() dto: UpdateTodoItemDto,
  ): TodoItem {
    return this.todoItemsService.update(param.todoItemId, dto);
  }

  @Delete('/:todoItemId')
  delete(@Param() param: { todoItemId: number }): void {
    this.todoItemsService.delete(param.todoItemId);
  }
}
