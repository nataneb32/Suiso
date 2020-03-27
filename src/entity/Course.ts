import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { User } from './User'
import { CourseModule } from './CourseModules'
import { Media } from './Media'

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(type => User, user => user.courses, { onDelete: 'CASCADE', eager: true })
    @JoinColumn()
    seller: User;

    @Column({ nullable: true })
    description: string;

    @OneToMany(type => CourseModule, cmodule => cmodule.course)
    modules: [CourseModule]

    @OneToOne(type => Media)
    thumbnail: Media
}
