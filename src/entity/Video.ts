import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Media } from './Media'
import { CourseModule } from './CourseModules'

@Entity()
export class Video {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    media: Media

    @Column()
    @ManyToOne(type => CourseModule, cmodule => cmodule.videos)
    module: CourseModule
}
