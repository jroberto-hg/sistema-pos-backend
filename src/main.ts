import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { StructuredLoggerService } from './commons/logger/structured-logger.service.js';
import { TransactionLoggerInterceptor } from './commons/logger/transaction-logger.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Registrar el interceptor global para auditoría, tiempos y trazas automáticas
  const loggerService = app.get(StructuredLoggerService);
  app.useGlobalInterceptors(new TransactionLoggerInterceptor(loggerService));

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);
}

await bootstrap();