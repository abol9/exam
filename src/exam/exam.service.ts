import {Injectable} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import {ExamEntity} from "./entities/exam.entity";
import {AddLessonDto} from "./dto/add-lesson.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ExamRepository} from "./repositories/exam.repository";
import {LessonRepository} from "../lesson/repositories/lesson.repository";

@Injectable()
export class ExamService {
  constructor(@InjectRepository(ExamRepository) private readonly examRepository: ExamRepository,
              @InjectRepository(LessonRepository) private readonly lessonRepository: LessonRepository) {
  }
  async create(createExamDto: CreateExamDto) {
    const exam = new ExamEntity();
    exam.title = createExamDto.title;
    exam.date = createExamDto.date;
    exam.time = createExamDto.time;
    exam.examTime = createExamDto.examTime;
    exam.description = createExamDto.description;
    exam.lessons = [];
    try {
      await exam.save();
      return {
        state: true,
        data: exam
      }
    } catch (e) {
      return {
        state: false,
        message: 'انجام نشد'
      }
    }
  }

  async addLesson(addLessonDto: AddLessonDto) {
    const exam = await this.examRepository.findOne(addLessonDto.examID);
    const lesson = await this.lessonRepository.findOne(addLessonDto.lessonID);
    if (exam && lesson) {
      try {
        if (!Array.isArray(exam.lessons)) {
          exam.lessons = [];
        }
        exam.lessons.push(lesson);
        await exam.save();
        return {
          state: 1,
          data: exam
        }
      } catch (e) {
        return {
          state: 0,
          message: e.message
        }
      }
    } else {
      return {
        state: 0,
        message: 'آزمون یا درس وجود ندارد'
      }
    }
  }

  async findAll() {
    return await this.examRepository.find();
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

  async quetions(id: string) {
    // return await this.examRepository.createQueryBuilder('exam')
    //     .where({id: +id})
    //     .innerJoinAndSelect('exam.lessons', 'lessons')
    //     .innerJoinAndSelect('lessons.questions', 'questions')
    //     .innerJoinAndSelect('questions.options', 'options')
    //     .getOne();
    return await this.lessonRepository.createQueryBuilder('lesson')
        .innerJoin('lesson.exams', 'exams')
        .where(`exams.id = ${id}`)
        .innerJoinAndSelect('lesson.questions', 'questions')
        .innerJoinAndSelect('questions.options', 'options')
        .getMany();
  }
}
