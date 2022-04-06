import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { logger } from './util/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    logger.info(`[Classroom] microservice running`);
  });

  app.listen(3334).then(() => {
    logger.info(`[Classroom] http server running`);
  });
}
bootstrap();
