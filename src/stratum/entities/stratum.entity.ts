import { Project } from 'src/project/entities/project.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stratum' })
export class Stratum {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  landUseBaseline: string;

  @Column({ type: 'varchar', length: 50 })
  landUseProject: string;

  @Column()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.stratums)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
