import { PrismaClient, Message } from "@prisma/client";
import { ICreateMessageDTO, IMessagesRepository } from "../IMessagesRepository";

const prisma = new PrismaClient();

export class MessagesRepository implements IMessagesRepository {
  async create({ senderId, receiverId, content }: ICreateMessageDTO): Promise<Message> {
    const message = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
      },
    });
    return message;
  }

  async listByUser(userId: string): Promise<Message[]> {
    const messages = await prisma.message.findMany({
      where: {
        receiverId: userId,
      },
      include: {
        sender: {
           select: {
             id: true,
             name: true,
             email: true
           }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  }
}
