import { Module } from '@nestjs/common';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ExamRepository} from "./repositories/exam.repository";
import {LessonRepository} from "../lesson/repositories/lesson.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ExamRepository, LessonRepository])],
  controllers: [ExamController],
  providers: [ExamService]
})
export class ExamModule {}
