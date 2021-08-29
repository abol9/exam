import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionRepository} from "./repositories/question.repository";
import {OptionEntity} from "./entities/option.entity";
import {OptionRepository} from "./repositories/option.repository";
import {LessonRepository} from "../lesson/repositories/lesson.repository";
import {QuestionEntity} from "./entities/question.entity";
import {ExamRepository} from "../exam/repositories/exam.repository";

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(QuestionRepository) private readonly questionRepository: QuestionRepository,
              @InjectRepository(OptionRepository) private readonly optionRepository: OptionRepository,
              @InjectRepository(LessonRepository) private readonly lessonRepository: LessonRepository,
              @InjectRepository(ExamRepository) private readonly  examRepository: ExamRepository) {
  }
  async create(createQuestionDto: CreateQuestionDto) {
    const lesson = await this.lessonRepository.findOne(createQuestionDto.lessonID);
    const exam = await this.examRepository.findOne(createQuestionDto.examID);
    if (lesson && exam) {
      const options = [];
      try {
        for (const item of createQuestionDto.options) {
          const opt = new OptionEntity();
          opt.text = item.text;
          opt.value = item.value;
          options.push(await this.optionRepository.save(opt));
        }
      } catch (e) {
        return {
          state: false,
          message: 'خطایی هنگام ایجاد گزینه ها'
        }
      }
      const quiz = new QuestionEntity();
      quiz.text = createQuestionDto.text;
      quiz.lesson = lesson;
      quiz.exam = exam;
      quiz.answer = createQuestionDto.answer;
      quiz.description = createQuestionDto.description;
      quiz.score = createQuestionDto.score;
      quiz.time = createQuestionDto.time;
      quiz.options = options;
      try {
        await quiz.save();
        return {
          state: true,
          data: quiz,
          message: 'عملیات با موفقیت انجام شد'
        };
      } catch (e) {
        return {
          state: false,
          message: 'خطایی وجود دارد'
        };
      }
    } else {
      return {
        state: false,
        message: !lesson || !exam ? 'درس و  وجود ندارد' : !lesson ? 'درس وجود ندارد' : 'آزمون وجود ندارد'
      }
    }
  }

  async findAll() {
    try {
      return {
        state: true,
        data: await this.questionRepository.find()
      };
    } catch (e) {
      return {
        state: false,
        message: 'خطایی وجود دارد'
      }
    }
  }

  async findOne(id: number) {
    try {
      const data = [];
      return await this.questionRepository.createQueryBuilder('question')
          .where({id: +id})
          .innerJoinAndSelect('question.options', 'options')
          // .innerJoinAndSelect('question.exam', 'exam')
          .getOne();
      if (data) {
        return {
          state: true,
          data
        };
      } else {
        return {
          state: false,
          message: 'سوال وجود ندارد'
        }
      }
    } catch (e) {
      return {
        state: false,
        message: 'خطایی وجود دارد'
      }
    }

  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const quiz = await this.questionRepository.findOne(id);
    quiz.text = updateQuestionDto.text || quiz.text;
    quiz.time = updateQuestionDto.time || quiz.time;
    quiz.score = updateQuestionDto.score || quiz.score;
    quiz.answer = updateQuestionDto.answer || quiz.answer;
    quiz.description = updateQuestionDto.description || quiz.description;
    quiz.lesson = updateQuestionDto.lessonID ? await this.lessonRepository.findOne(updateQuestionDto.lessonID) : quiz.lesson;
    try {
      await quiz.save();
      return {
        state: true,
        data: quiz
      };
    } catch (e) {
      return {
        state: 0,
        message: 'ایجاد ناموفق بود'
      }
    }
  }

  async remove(id: number) {
    const quiz = this.questionRepository.findOne(+id);
    if (quiz) {
      try {
        const res = await this.questionRepository.delete({id: id});
        return {
          state: !!res,
          data: res
        }
      } catch (e) {
        return {
          state: false,
          message: 'ایجاد انجام نشد'
        }
      }
    } else {
      return {
        state: false,
        message: 'سوال یافت نشد'
      }
    }
  }
}
