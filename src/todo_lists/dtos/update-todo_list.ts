import { IsNotEmpty } from 'class-validator';

export class UpdateTodoListDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
