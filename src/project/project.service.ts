import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(Project) private readonly projectsRepository: Repository<Project>){
    }

  async create(createProjectDto: CreateProjectDto) {

    const user = this.projectsRepository.create(createProjectDto)

    return await this.projectsRepository.save(user) 
  }

  async findAll() {
    return await this.projectsRepository.find()
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOne({
      where: {id}
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {

    const project = await this.findOne(id)

    if(!project){
      throw new NotFoundException("Project not found. Please insert a valid ID!")
    }

    return await this.projectsRepository.update(id, updateProjectDto);
  }

  remove(id: number) {
    const project = this.findOne(id)

    if(!project){
      throw new NotFoundException("Project not found. Please insert a valid ID!")
    }

    return this.projectsRepository.delete(id);
  }
}
