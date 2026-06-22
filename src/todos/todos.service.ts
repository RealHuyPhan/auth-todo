import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(userId: string, createTodoDto: CreateTodoDto) {
    // Lưu todo vào database bằng TypeORM
    const newTodo = this.todoRepository.create({
      userId: userId,
      ...createTodoDto
    });
    return await this.todoRepository.save(newTodo);
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const data = {
      ...updateTodoDto
    }
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
