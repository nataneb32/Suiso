import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm'
import { Course } from './Course'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
      unique: true
    })
    username!: string

    @Column()
    password!: string

    @OneToMany(type => Course, course => course.seller, { onDelete: 'CASCADE' })
    courses: Course[]
}
