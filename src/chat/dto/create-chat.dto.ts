export class CreateChatDto {
  _id: string;
}

export class CreateMessageDto {
  text: string;
  filePath: string;
  groupId: string;
  userId?: string;
}
