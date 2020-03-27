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

    @OneToMany(type => Video, video => video.module, { cascade: true })
    videos: [Video]

    @ManyToOne(type => Course, course => course.modules, { cascade: true })
    course: Course
}
