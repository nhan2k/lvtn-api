import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { ChatGroupService } from './chat-group.service';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { Server } from 'socket.io';
import { Observable, from, map } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGroupGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatGroupService: ChatGroupService) {}
  handleConnection(client: any, ...args: any[]) {
    console.log(`Socket connected`);
  }
  handleDisconnect(client: any) {
    return;
  }

  // @SubscribeMessage('chat')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map((item) => ({ event: 'events', data: 2 })));
  // }

  @SubscribeMessage('sendNotify')
  async notify(@MessageBody() data: number): Promise<any> {
    this.server.emit('notifyReceive', data);
  }
}
