import { IsOptional } from 'class-validator';

export class UpdateTodoTaskDto {
  @IsOptional()
  description?: string;

  completed?: boolean;
}
