import { inject, injectable } from "tsyringe";
import { Friendship } from "@prisma/client";
import { IFriendshipsRepository } from "../../repositories/IFriendshipsRepository";

interface IResponse {
  id: string;
  createdAt: Date;
  sender: {
    id: string;
    name: string;
    email: string;
  };
}

@injectable()
export class ListFriendRequestsUseCase {
  constructor(
    @inject("FriendshipsRepository")
    private friendshipsRepository: IFriendshipsRepository
  ) {}

  async execute(userId: string): Promise<IResponse[]> {
    const requests = await this.friendshipsRepository.findPendingRequestsByUserId(userId);

    const formattedRequests = requests.map((request) => ({
      id: request.id,
      createdAt: request.createdAt,
      sender: {
        id: (request as any).requester.id,
        name: (request as any).requester.name,
        email: (request as any).requester.email,
      },
    }));

    return formattedRequests;
  }
}
