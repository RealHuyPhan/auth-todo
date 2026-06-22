import { IsNotEmpty, IsString } from "class-validator";


export class CreateTodoDto {
    @IsNotEmpty({ message: 'title is required' })
    @IsString({ message: 'title must be a string' })
    title: string;
}
