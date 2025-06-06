import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTodoTaskDto } from './dtos/create-todo_task';
import { UpdateTodoTaskDto } from './dtos/update-todo_task';
import { TodoTask } from 'src/interfaces/todo_task.interface';
import { TodoTasksService } from './todo_tasks.service';

@Controller('api/todoTasks')
export class TodoTasksController {
  constructor(private todoTasksService: TodoTasksService) {}

  @Get()
  index(): TodoTask[] {
    return this.todoTasksService.all();
  }

  @Get('/:todoTaskId')
  show(@Param() param: { todoTaskId: number }): TodoTask {
    return this.todoTasksService.get(param.todoTaskId);
  }

  @Post()
  create(@Body() dto: CreateTodoTaskDto): TodoTask {
    return this.todoTasksService.create(dto);
  }

  @Put('/:todoTaskId')
  update(
    @Param() param: { todoTaskId: number },
    @Body() dto: UpdateTodoTaskDto,
  ): TodoTask {
    return this.todoTasksService.update(param.todoTaskId, dto);
  }

  @Delete('/:todoTaskId')
  delete(@Param() param: { todoTaskId: number }): void {
    this.todoTasksService.delete(param.todoTaskId);
  }
}
