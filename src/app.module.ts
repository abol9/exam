import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExamModule } from './exam/exam.module';
import { QuestionModule } from './question/question.module';
import { LessonModule } from './lesson/lesson.module';

@Module({
  imports: [
    ExamModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'exam',
      username: 'root',
      password: '',
      entities: ['dist/**/*.entity{.js,.ts}'],
      synchronize: true,
    }),
    QuestionModule,
    LessonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
