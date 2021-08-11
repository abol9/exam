import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {LessonEntity} from "./lesson.entity";

@Entity('exam')
export class ExamEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    examTime: number;

    @Column()
    description: string;

    @ManyToMany(() => LessonEntity, {cascade: true})
    @JoinTable()
    lessons: LessonEntity[];
}
