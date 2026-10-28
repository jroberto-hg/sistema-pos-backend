import { Global, Module } from "@nestjs/common";
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { StructuredLoggerService } from "./structured-logger.service.js";

@Global()
@Module({
    imports: [
        PinoLoggerModule.forRoot({
        }),
    ],
    providers: [StructuredLoggerService],
    exports: [StructuredLoggerService],
})

export class LoggerModule { }