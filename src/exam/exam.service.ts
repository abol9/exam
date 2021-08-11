import {Inject, Injectable} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import {CreateLessonDto} from "./dto/create-lesson.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {LessonEntity} from "./entities/lesson.entity";
import {Repository} from "typeorm";

@Injectable()
export class ExamService {
  constructor(@InjectRepository(LessonEntity) private readonly lessonRepository : Repository<LessonEntity>) {
  }
  create(createExamDto: CreateExamDto) {
    return 'This action adds a new exam';
  }

  async createLesson(createLessonDto: CreateLessonDto) {
    return await this.lessonRepository.save(createLessonDto);
  }

  findAll() {
    return `This action returns all exam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exam`;
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return `This action updates a #${id} exam`;
  }

  remove(id: number) {
    return `This action removes a #${id} exam`;
  }
}
