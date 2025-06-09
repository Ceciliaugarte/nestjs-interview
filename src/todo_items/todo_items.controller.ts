import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dtos/create-todo_Item';
import { UpdateTodoItemDto } from './dtos/update-todo_Item';
import { TodoItem } from 'src/interfaces/todo_item.interface';
import { TodoItemsService } from './todo_items.service';

@Controller('api/todoitems')
export class TodoItemsController {
  constructor(private todoItemsService: TodoItemsService) {}

  @Get('/list/:todoListId')
  index(@Param() param: { todoListId: number }): TodoItem[] {
    return this.todoItemsService.all(param.todoListId);
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

  @Patch('/:todoItemId/complete')
  complete(@Param() param: { todoItemId: number }): TodoItem {
    return this.todoItemsService.markAsCompleted(param.todoItemId);
  }

  @Delete('/:todoItemId')
  delete(@Param() param: { todoItemId: number }): void {
    this.todoItemsService.delete(param.todoItemId);
  }
}
