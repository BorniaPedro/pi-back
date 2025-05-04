import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){

  }
  

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto)

    return await this.usersRepository.save(user)
  } 

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.findOne(id)
    
    if(!user){
        throw new NotFoundException('User not found! Please insert a valid ID!',)
    }

    return await this.usersRepository.update(id, updateUserDto)

  }

  async remove(id: number) {

    const user = await this.findOne(id)
    
    if(!user){
        throw new NotFoundException('User not found! Please insert a valid ID!',)
    }
    return this.usersRepository.delete(id);
  }
}
