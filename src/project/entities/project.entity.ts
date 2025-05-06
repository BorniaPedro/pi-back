import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @Column({ type: 'varchar', length: 20 })
  location: string;

  @Column({ type: 'varchar', length: 20 })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  climateZone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ecologicalZone: string;

  @Column({ type: 'date' })
  startPeriod: Date;

  @Column({ type: 'date' })
  endPeriod: Date;
}
