import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const conf = new DocumentBuilder()
      .setTitle('آزمون')
      .setVersion('1.0.0')
      .setContact('abolfazl', 'http://sadsir.ir', 'mrabolfazl12@gmail.com')
      .build();
  const doc = SwaggerModule.createDocument(app, conf);
  SwaggerModule.setup('swagger', app, doc);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
