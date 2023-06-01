export class CreateChatDto {
  postId: string;
  sellerId: string;
}

export class CreateMessageDto {
  text: string;
  filePath: string;
  groupId: string;
  userId?: string;
}
