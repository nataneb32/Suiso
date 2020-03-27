import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Video } from './Video'
import { Course } from './Course'

@Entity()
export class CourseModule {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @OneToMany(type => Video, video => video.module)
    videos: [Video]

    @ManyToOne(type => Course, course => course.modules, { onDelete: 'CASCADE' })
    course: Course
}
