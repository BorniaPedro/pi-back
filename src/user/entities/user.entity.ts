import { Project } from "src/project/entities/project.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 50})
    name: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @OneToMany(() => Project, project => project.owner)
    projects: Project[]

}
