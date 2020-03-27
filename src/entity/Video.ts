import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
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

    @OneToOne(type => Media)
    @JoinColumn()
    media: Media

    @ManyToOne(type => CourseModule, cmodule => cmodule.videos, { onDelete: 'CASCADE' })
    module: CourseModule
}
