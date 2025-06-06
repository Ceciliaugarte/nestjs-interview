import { Module } from '@nestjs/common';
import { TodoItemsController } from './todo_Items.controller';
import { TodoItemsService } from './todo_items.service';
import { TodoListsModule } from 'src/todo_lists/todo_lists.module';

@Module({
  imports: [TodoListsModule],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}
