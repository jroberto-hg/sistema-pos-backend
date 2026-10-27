export interface Meta {
    transactionId: string;
    status: string;
    statusCode: number;
    timestamp: string;
}

export class WebResponse<T> {
    meta: Meta | null = null;
    data: T | null = null;
    type: number = 0;
    message: string = "OK";

    constructor(
        data: T, 
        statusCode: number = 200, 
        status: string = "SUCCESS",
        message: string = "OK",
        transactionId?: string, 
    ) {
        this.meta = {
            transactionId: transactionId || generateTransactionId(),
            status: status,
            statusCode: statusCode,
            timestamp: new Date().toISOString(),
        }
        this.data = data;
        this.message = message;
    }
}

// función auxiliar para generar un ID de transacción único si no se provee
function generateTransactionId(): string {
    return 'tx-' + Math.random().toString(36).substring(2, 15);
}