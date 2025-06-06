import { Module } from '@nestjs/common';
import { TodoTasksController } from './todo_tasks.controller';
import { TodoTasksService } from './todo_tasks.service';
import { TodoListsService } from 'src/todo_lists/todo_lists.service';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

@Module({
  imports: [TodoListsModule],
  controllers: [TodoTasksController],
  providers: [TodoTasksService],
})
export class TodoTasksModule {}
