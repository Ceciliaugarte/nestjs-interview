import { IsNotEmpty } from 'class-validator';

export class CreateTodoListDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}
