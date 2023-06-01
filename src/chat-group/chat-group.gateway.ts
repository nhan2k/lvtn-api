import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from 'src/chat/chat.service';

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

  constructor(
    private readonly jwtService: JwtService,
    private readonly chatService: ChatService,
  ) {}
  handleConnection(client: any, ...args: any[]) {
    console.log(`Socket connected`);
  }
  handleDisconnect(client: any) {
    return;
  }

  @SubscribeMessage('sendMessage')
  async findAll(@MessageBody() data: any) {
    const { token, ...rest } = data;
    const decoded = this.jwtService.decode(token);

    const response = await this.chatService.createMessage(
      rest,
      (decoded as any).id,
    );

    return this.server.emit('receivedMessage', response);
  }

  @SubscribeMessage('sendNotify')
  async notify(@MessageBody() data: any): Promise<any> {
    this.server.emit('notifyReceive', data);
  }
}
