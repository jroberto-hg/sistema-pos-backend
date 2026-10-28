export interface TraceIdentifier {
    id: string;
    parentId: string | null;
    correlationId: string;
}

export interface ApplicationInfo {
    name: string;
    version: string;
    environment: string;
    kind: string;
    hostname: string;
}

export interface MeasurementInfo {
    method: string;
    elapsedTime: string;
}

export interface TransactionLogDto { 
    timestamp: string;
    level: 'Information' | 'Error' | 'Warning';
    logType: string;
    eventType: string;
    message: string;
    status: 'Success' | 'Failed';
    traceIdentifier: TraceIdentifier;
    applicationInfo: ApplicationInfo;
    measurementInfo: MeasurementInfo;
    additionalInfo?: Record<string, any>;
    sourceFile: string;
    errorDetails?: {
        message: string;
        stack?: string;
    };
}