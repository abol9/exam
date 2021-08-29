import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";

@Entity()
export class OptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    text: string;

    @ManyToOne(() => QuestionEntity, (quiz) => quiz.options,
        {onDelete: 'CASCADE'})
    question: QuestionEntity;
}
