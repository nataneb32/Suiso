import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Course } from './Course'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      unique: true
    })
    username!: string

    @Column({ select: false })
    password!: string

    @OneToMany(type => Course, course => course.seller, { onDelete: 'CASCADE' })
    courses: Course[]
}
