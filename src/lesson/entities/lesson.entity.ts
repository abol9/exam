import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "../../question/entities/question.entity";
import {ExamEntity} from "../../exam/entities/exam.entity";

@Entity('lesson')
export class LessonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => ExamEntity, (exam) => exam.lessons)
    exams: ExamEntity;

    @OneToMany(() => QuestionEntity, (quiz) => quiz.lesson, {
        onDelete: 'CASCADE'
    })
    questions: QuestionEntity[];
}
