import { Global, Module } from "@nestjs/common";
import { StructuredLoggerService } from "./structured-logger.service.js";

@Global()
@Module({
    providers: [StructuredLoggerService],
    exports: [StructuredLoggerService],
})

export class LoggerModule { }