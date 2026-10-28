import { Injectable } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@Injectable()
@WebSocketGateway({
    cors: { origin: '*' },
})
export class PosSocketAdapter {
    @WebSocketServer()
    server: Server;

    emitEvent(event: string, payload: any) {
        if(this.server) {
            this.server.emit(event, payload);
        }
    }
}