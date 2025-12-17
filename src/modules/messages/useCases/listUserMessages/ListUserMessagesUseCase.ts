import { inject, injectable } from "tsyringe";
import { Message } from "@prisma/client";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";

@injectable()
export class ListUserMessagesUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute(userId: string): Promise<Message[]> {
    const messages = await this.messagesRepository.listByUser(userId);
    return messages;
  }
}
