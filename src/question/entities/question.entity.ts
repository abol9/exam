import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {OptionEntity} from "./option.entity";
import {LessonEntity} from "../../lesson/entities/lesson.entity";
import {ExamEntity} from "../../exam/entities/exam.entity";

@Entity('question')
export class QuestionEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    //TODO:add Type
    // @Column()
    // type: string;

    @Column()
    time: number;

    @Column()
    score: number;

    @ManyToOne(() => ExamEntity, {onDelete: 'CASCADE'})
    exam: ExamEntity;

    @ManyToOne(() => LessonEntity, (lesson) => lesson.questions,
        {onDelete: 'CASCADE'})
    lesson: LessonEntity;

    @OneToMany(() => OptionEntity, (option) => option.question,
        {onDelete: 'CASCADE'})
    options: OptionEntity[];

    @Column()
    answer: number;

    @Column()
    description: string;
}
