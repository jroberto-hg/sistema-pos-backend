import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { StructuredLoggerService } from "./structured-logger.service.js";
import { Observable, tap } from "rxjs";

@Injectable()
export class TransactionLoggerInterceptor implements NestInterceptor { 
    constructor(private readonly loggerService: StructuredLoggerService) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const startTime = performance.now();
        const request = context.switchToHttp().getRequest();
        const handlerName = context.getHandler().name;
        const className = context.getClass().name;

        const entityType = className.replace('Controller', '');

        return next.handle().pipe(
            tap({
                next: (data) => { 
                    const elapsedTimeMs = performance.now() - startTime;
                    const entityId = data?.id || request.params?.id || null;

                    this.loggerService.logTransaction({
                        methodName: handlerName,
                        sourceFile: `${className}.ts`,
                        elapsedTimeMs,
                        success: true,
                        entityType,
                        entityId,
                        additionalInfo: { query: request.query, body: request.body }
                    });
                },
                error: (error) => { 
                    const elapsedTimeMs = performance.now() - startTime;

                    this.loggerService.logTransaction({
                        methodName: handlerName,
                        sourceFile: `${className}.ts`,
                        elapsedTimeMs,
                        success: false,
                        entityType,
                        entityId: request.params?.id || null,
                        error
                    });
                },
            })
        );
    }
}