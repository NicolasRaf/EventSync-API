import { Message, Prisma } from "@prisma/client";

export interface ICreateMessageDTO {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface IMessagesRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  listByUser(userId: string): Promise<Message[]>;
}
