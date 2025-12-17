import { inject, injectable } from "tsyringe";
import { Message } from "@prisma/client";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { IFriendshipsRepository } from "../../../social/repositories/IFriendshipsRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  senderId: string;
  receiverId: string;
  content: string;
}

@injectable()
export class SendMessageUseCase {
  constructor(
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("FriendshipsRepository")
    private friendshipsRepository: IFriendshipsRepository
  ) {}

  async execute({ senderId, receiverId, content }: IRequest): Promise<Message> {
    if (!content) {
      throw new AppError("Content is required");
    }

    if (senderId === receiverId) {
      throw new AppError("You cannot send a message to yourself");
    }

    // Check if users are friends
    const friendship = await this.friendshipsRepository.findByRequesterAndAddressee(
      senderId,
      receiverId
    );

    // Verify if friendship exists AND is accepted
    // Note: findByRequesterAndAddressee returns the friendship regardless of who is requester/addressee
    // We just need to check if status is ACCEPTED.
    
    if (!friendship || friendship.status !== "ACCEPTED") {
      throw new AppError("You can only send messages to friends", 403);
    }

    const message = await this.messagesRepository.create({
      senderId,
      receiverId,
      content,
    });

    return message;
  }
}
