import { IsOptional } from 'class-validator';

export class UpdateTodoItemDto {
  @IsOptional()
  description?: string;

  completed?: boolean;
}
