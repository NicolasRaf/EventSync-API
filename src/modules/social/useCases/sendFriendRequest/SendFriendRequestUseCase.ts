import { inject, injectable } from "tsyringe";
import { IFriendshipsRepository } from "../../repositories/IFriendshipsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IEventsRepository } from "../../../events/repositories/IEventsRepository";
import { Friendship } from "@prisma/client";


interface IRequest {
  requesterId: string;
  addresseeId: string;
}

@injectable()
export class SendFriendRequestUseCase {
  constructor(
    @inject("FriendshipsRepository")
    private friendshipsRepository: IFriendshipsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute({ requesterId, addresseeId }: IRequest): Promise<Friendship> {
    if (requesterId === addresseeId) {
      throw new Error("You cannot send a friend request to yourself");
    }

    const friendshipAlreadyExists = await this.friendshipsRepository.findByRequesterAndAddressee(
      requesterId,
      addresseeId
    );

    if (friendshipAlreadyExists) {
      console.log(`[DEBUG] Amizade já existe: ${requesterId} -> ${addresseeId}`);
      throw new Error("Friendship request already sent or users are already friends");
    }

    // Verify if they share a common event
    const requesterRegistrations = await this.eventsRepository.findRegistrationsByUserId(requesterId);
    const addresseeRegistrations = await this.eventsRepository.findRegistrationsByUserId(addresseeId);

    const requesterEventIds = new Set(requesterRegistrations.map((r) => r.eventId));
    const hasCommonEvent = addresseeRegistrations.some((r) => requesterEventIds.has(r.eventId));

    if (!hasCommonEvent) {
      console.log(`[DEBUG] Sem evento em comum entre: ${requesterId} e ${addresseeId}`);
      throw new Error("Users must be registered in the same event to send a friend request");
    }

    const friendship = await this.friendshipsRepository.create({
      requesterId,
      addresseeId,
      status: "PENDING",
    });

    return friendship;
  }
}
