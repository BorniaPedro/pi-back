import { Stratum } from 'src/stratum/entities/stratum.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  location: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  climateZone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ecologicalZone: string;

  @Column({ type: 'date' })
  startPeriod: string;

  @Column({ type: 'date' })
  endPeriod: string;

  @OneToMany(() => Stratum, (stratum) => stratum.project)
  stratums: Stratum[];
}
