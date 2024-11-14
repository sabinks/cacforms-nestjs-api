import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        console.log(errors);

        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new UnprocessableEntityException(result);
      },
      stopAtFirstError: true,
    }),
  );
  app.connectMicroservice({
    global: true,
    transport: Transport.RMQ,
    name: 'MAIL_SERVICE',
    options: {
      urls: [
        process.env.NODE_ENV == 'development'
          ? 'amqp://localhost:5672'
          : `${process.env.RBMQ_URL}`,
      ],
      queue: 'mail_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen(3000);
}
bootstrap();
