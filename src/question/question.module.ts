import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionRepository} from "./repositories/question.repository";
import {OptionRepository} from "./repositories/option.repository";
import {LessonRepository} from "../lesson/repositories/lesson.repository";
import {ExamRepository} from "../exam/repositories/exam.repository";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository, OptionRepository, LessonRepository, ExamRepository])],
  controllers: [QuestionController],
  providers: [QuestionService]
})
export class QuestionModule {}
