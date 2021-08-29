import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {LessonEntity} from "../../lesson/entities/lesson.entity";

@Entity('exam')
export class ExamEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
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

    @ManyToMany(() => LessonEntity, (lesson) => lesson.exams, {cascade: true, onDelete: 'CASCADE'})
    @JoinTable()
    lessons: LessonEntity[];
}
