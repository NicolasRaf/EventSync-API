import { inject, injectable } from "tsyringe";
import { Friendship } from "@prisma/client";
import { IFriendshipsRepository } from "../../repositories/IFriendshipsRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  userId: string;
  requestId: string;
  accept: boolean;
}

@injectable()
export class RespondFriendRequestUseCase {
  constructor(
    @inject("FriendshipsRepository")
    private friendshipsRepository: IFriendshipsRepository
  ) {}

  async execute({ userId, requestId, accept }: IRequest): Promise<Friendship> {
    const friendship = await this.friendshipsRepository.findById(requestId);

    if (!friendship) {
      throw new AppError("Friend request not found", 404);
    }

    if (friendship.addresseeId !== userId) {
      throw new AppError("This friend request is not for you", 403);
    }

    if (friendship.status !== "PENDING") {
       throw new AppError("This friend request is already handled");
    }

    if (accept) {
      friendship.status = "ACCEPTED";
    } else {
      friendship.status = "REJECTED";
    }

    const updatedFriendship = await this.friendshipsRepository.save(friendship);

    return updatedFriendship;
  }
}
