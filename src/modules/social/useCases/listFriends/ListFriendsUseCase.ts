import { inject, injectable } from "tsyringe";
import { Friendship } from "@prisma/client";
import { IFriendshipsRepository } from "../../repositories/IFriendshipsRepository";

interface IResponse {
  id: string;
  name: string;
  email: string;
}

@injectable()
export class ListFriendsUseCase {
  constructor(
    @inject("FriendshipsRepository")
    private friendshipsRepository: IFriendshipsRepository
  ) {}

  async execute(userId: string): Promise<IResponse[]> {
    const friendships = await this.friendshipsRepository.findFriendsByUserId(userId);

    const friends = friendships.map((friendship) => {
      // If I am the requester, the friend is the addressee
      // If I am the addressee, the friend is the requester
      const isRequester = friendship.requesterId === userId;
      
      const friendUser = isRequester ? (friendship as any).addressee : (friendship as any).requester;

      return {
        id: friendUser.id,
        name: friendUser.name,
        email: friendUser.email,
      };
    });

    return friends;
  }
}
