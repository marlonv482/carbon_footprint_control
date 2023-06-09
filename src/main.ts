import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CORS } from './constants';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({
    transformOptions:{
      enableImplicitConversion:true
    }
  }))
  const reflector=app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const configService = app.get(ConfigService);
  

  app.enableCors(CORS)

  app.setGlobalPrefix('api');
  
  const options = new DocumentBuilder()
  .setTitle('Task Manager')
  .setDescription('Task Manager Application')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('PORT'));
  console.log(`Application running on: ${await app.getUrl()}`)
  
}
bootstrap();
