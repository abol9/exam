import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {OptionEntity} from "./option.entity";

@Entity('question')
export class QuestionEntity {
    @PrimaryColumn()
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

    @OneToMany(type => OptionEntity, (option) => option.question)
    options: OptionEntity[];

    @Column()
    answer: number;

    @Column()
    description: string;
}
