import { Global, Module } from "@nestjs/common";
import { PosSocketAdapter } from "./adapters/pos-socket.adapters.js";

@Global()
@Module({
    providers: [PosSocketAdapter],
    exports: [PosSocketAdapter],
})

export class EventsModule { }