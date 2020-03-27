import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Video } from './Video'

@Entity()
export class CourseModule {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    @OneToMany(type => Video, video => video.module)
    videos: [Video]
}
