import { Friendship, Prisma } from "@prisma/client";

export interface IFriendshipsRepository {
  create(data: Prisma.FriendshipUncheckedCreateInput): Promise<Friendship>;
  findByRequesterAndAddressee(requesterId: string, addresseeId: string): Promise<Friendship | null>;
  findPendingRequestsByUserId(userId: string): Promise<Friendship[]>;
  findFriendsByUserId(userId: string): Promise<Friendship[]>;
  findById(id: string): Promise<Friendship | null>;
  save(friendship: Friendship): Promise<Friendship>;
}
