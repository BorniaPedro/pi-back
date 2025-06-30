import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectsRepository.create(createProjectDto);

    return await this.projectsRepository.save(project);
  }

  async findAll() {
    return await this.projectsRepository.find();
  }

  async findOne(id: number) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException(
        'Project not found. Please insert a valid ID!',
      );
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);

    await this.projectsRepository.update(id, updateProjectDto);

    return await this.projectsRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.projectsRepository.delete(id);
  }
  async getStratunsByProject(id: number) {

    const project = await this.projectsRepository.findOne({
      where: {id},
      relations: ['stratums'],
    })
    if(!project){
      throw new NotFoundException('Projeto não encontrado')
    }
    return project.stratums
  }
}
