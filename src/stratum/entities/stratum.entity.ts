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

  @ManyToOne(() => Project, (project) => project.stratums, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ type: 'numeric', nullable: true, name: 'agb_stock_baseline' })
  agbStockBaseline: number;

  @Column({ type: 'numeric', nullable: true, name: 'agb_growth_baseline' })
  agbGrowthBaseline: number;

  @Column({ type: 'numeric', nullable: true, name: 'agb_stock_project' })
  agbStockProject: number;

  @Column({ type: 'numeric', nullable: true, name: 'agb_growth_project' })
  agbGrowthProject: number;

  @Column({ type: 'numeric', nullable: true, name: 'bgb_to_agb_ratio' })
  bgbToAgbRatio: number;
}
