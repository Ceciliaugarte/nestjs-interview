import { Module } from '@nestjs/common';
import { TodoListsModule } from './todo_lists/todo_lists.module';
import { TodoTasksModule } from './todo_tasks/todo_tasks.module';

@Module({
  imports: [TodoListsModule, TodoTasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
