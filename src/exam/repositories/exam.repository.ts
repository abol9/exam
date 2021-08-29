import {EntityRepository, Repository} from "typeorm";
import {ExamEntity} from "../entities/exam.entity";
@EntityRepository(ExamEntity)
export class ExamRepository extends Repository<ExamEntity> {

}
