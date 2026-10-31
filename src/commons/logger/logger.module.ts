import { Global, Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { StructuredLoggerService } from "./structured-logger.service.js";

@Global()
@Module({
    imports: [
        PinoLoggerModule.forRoot({
            pinoHttp: {
                transport: process.env.NODE_ENV !== 'production' 
                    ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss Z' } } 
                    : undefined,
            },
        }),
    ],
    providers: [StructuredLoggerService],
    exports: [StructuredLoggerService],
})

export class LoggerModule { }