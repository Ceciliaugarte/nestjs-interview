import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTodoTaskDto {
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsNumber({}, { message: 'TodoListId must be a number' })
  todoListId: number;
}
