import {Column, Entity, ManyToMany, PrimaryColumn} from "typeorm";

@Entity('lesson')
export class LessonEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;
}
