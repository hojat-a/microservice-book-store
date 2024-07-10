import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: process.env.SERVER_URL,//`${process.env.URL}:${process.env.PORT}`,
      package: 'auth',
      protoPath: join(__dirname, './_proto/auth.proto'),
    },
  });
  await app.listen();
}
bootstrap();