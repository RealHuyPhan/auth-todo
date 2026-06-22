import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    delete (savedUser as Partial<User>).password;

    return savedUser;
  }


  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
}
