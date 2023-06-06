import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from 'src/chat/chat.service';
import { PostService } from 'src/post/post.service';

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
    private readonly postService: PostService,
  ) {}
  handleConnection(client: any, ...args: any[]) {
    console.log(`Socket connected`);
  }
  handleDisconnect(client: any) {
    return;
  }

  @SubscribeMessage('createRoom')
  async createRoom(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    await client.join(data);
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

  @SubscribeMessage('sendPostCreate')
  async createPost(@MessageBody() data: any) {
    console.log(
      '🚀 ~ file: chat-group.gateway.ts:66 ~ createPost ~ data:',
      data,
    );
  }
}
