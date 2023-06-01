import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto, CreateMessageDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createGroup(@Body() createChatDto: CreateChatDto, @Request() req: any) {
    return await this.chatService.createGroup(createChatDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    return await this.chatService.findAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('message/:id')
  async findAllMessagesByGroupId(@Param('id') groupId, @Request() req: any) {
    const response = await this.chatService.findAllMessagesByGroupId(
      groupId,
      req.user.id,
    );

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('message')
  async createMessage(@Body() createChatDto: any, @Request() req: any) {
    return await this.chatService.createMessage(createChatDto, req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
