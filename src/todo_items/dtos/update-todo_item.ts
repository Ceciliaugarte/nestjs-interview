import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoItemDto {
  @IsOptional()
  description?: string;
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
