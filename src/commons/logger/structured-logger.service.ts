import { Injectable, LoggerService } from "@nestjs/common";
import { TransactionLogDto } from "./dto/transaction-logger.dto.js";

@Injectable()
export class StructuredLoggerService implements LoggerService {
    log(message: string, context?: string) { }

    error(message: string, trace?: string, context?: string) { }

    warn(message: string, context?: string) { }

    // Método centralizado para generar la traza
    logTransaction(data: {
        methodName: string;
        sourceFile: string;
        elapsedTimeMs: number;
        success: boolean;
        entityType?: string;
        entityId?: any;
        additionalInfo?: Record<string, any>;
        error?: any;
    }) {
        const { methodName, sourceFile, elapsedTimeMs, success, entityType, entityId, additionalInfo, error } = data;

        // Formato de milisegundos a HH:MM:SS.fffffff
        const secondsNum = elapsedTimeMs / 1000;
        const secondsStr = secondsNum.toFixed(7);
        const elapsedTimeFormatted = `00:00:${secondsNum < 10 ? '0' : ''}${secondsStr}`;

        const logPayload: TransactionLogDto = { 
            timestamp: new Date().toISOString(),
            level: success ? "Information" : "Error",
            logType: "TRANSACTION",
            eventType: success ? "TRANSACTION_SUCCESS" : "TRANSACTION_FAILED",
            message: success ? "Operación ejecutada exitosamente" : `Error en operación: ${error?.message || 'Desconocido'}`,
            status: success ? "Success" : "Failed",
            traceIdentifier: {
                id: `trc-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                parentId: null,
                correlationId: `corr-${Date.now()}`
            },
            applicationInfo: {
                name: "Coppel.POS.Backend",
                version: "1.0.0",
                environment: process.env.NODE_ENV || "DEV",
                kind: "rest-service",
                hostname: process.env.HOSTNAME || "pos-server-01"
            },
            measurementInfo: {
                method: methodName,
                elapsedTime: elapsedTimeFormatted
            },
            additionalInfo: {
                entityType: entityType || 'Unknown',
                entityId: entityId || null,
                ...additionalInfo
            },
            sourceFile: sourceFile,
            ...(error && {
                errorDetails: {
                    message: error.message,
                    stack: error.stack
                }
            })
        };

        console.log(JSON.stringify(logPayload, null, 2));
    }
}