import { TodoTask } from './todo_task.interface';

export interface TodoList {
  id: number;
  name: string;
  tasks: TodoTask[];
}
