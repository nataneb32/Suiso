import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm'

@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    protected url: string;

    @AfterLoad()
    getUrl () {
      this.url = 'http://localhost:4000/stream/' + this.name
    }
}
