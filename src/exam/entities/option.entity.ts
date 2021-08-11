import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {QuestionEntity} from "./question.entity";

@Entity()
export class OptionEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    text: string;

    @ManyToOne(() => QuestionEntity, (quiz) => quiz.options)
    question: QuestionEntity;
}
