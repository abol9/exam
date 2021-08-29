import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {LessonRepository} from "./repositories/lesson.repository";
import {LessonEntity} from "./entities/lesson.entity";

@Injectable()
export class LessonService {
  constructor(@InjectRepository(LessonRepository) private readonly lessonRepository: LessonRepository) {
  }

  async create(createLessonDto: CreateLessonDto) {
    const lesson = new LessonEntity();
    lesson.title = createLessonDto.title;
    lesson.questions = [];
    try {
      await lesson.save();
      return {
        state: true,
        data: lesson,
        message: 'با موفقیت ایجاد شد.'
      };
    } catch (e) {
      return {
        state: false,
        message: 'ایجاد انجام نشد'
      }
    }
  }

  async findAll() {
    return await this.lessonRepository.find();
  }

  async findOne(id: number) {
    try {
      const lesson = await this.lessonRepository.findOne(+id);
      if (lesson) {
        return {
          state: 1,
          data: lesson
        }
      } else {
        return {
          state: 0,
          message: 'درس مورد نظر وجود ندارد'
        }
      }
    } catch (e) {
      return {
        state: 0,
        message: 'خطایی وجود دارد'
      }
    }

  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  async remove(id: number) {
    const lesson = await this.lessonRepository.findOne(+id);
    if (lesson) {
      return {
        state: true,
        message: 'حذف انجام شد.',
        data : await this.lessonRepository.find()
      };
    } else {
      return {
        state: false,
        message: 'درس مورد نظر یافت نشد'
      };
    }
  }

  async findQuiz(id: string) {
    return await this.lessonRepository.createQueryBuilder('lesson')
        .where({id: id})
        .innerJoinAndSelect('lesson.questions','questions')
        .innerJoinAndSelect('questions.options', 'options')
        .getMany();
  }
}
