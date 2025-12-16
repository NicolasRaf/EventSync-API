import { Prisma, Friendship, PrismaClient } from "@prisma/client";
import { IFriendshipsRepository } from "../IFriendshipsRepository";

const prisma = new PrismaClient();

export class FriendshipsRepository implements IFriendshipsRepository {
  async create(data: Prisma.FriendshipUncheckedCreateInput): Promise<Friendship> {
    const friendship = await prisma.friendship.create({
      data,
    });
    return friendship;
  }

  async findByRequesterAndAddressee(
    requesterId: string,
    addresseeId: string
  ): Promise<Friendship | null> {
    const friendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          {
            requesterId,
            addresseeId,
          },
          {
            requesterId: addresseeId,
            addresseeId: requesterId,
          },
        ],
      },
    });
    return friendship;
  }

  async findPendingRequestsByUserId(userId: string): Promise<Friendship[]> {
    const friendships = await prisma.friendship.findMany({
      where: {
        addresseeId: userId,
        status: "PENDING",
      },
      include: {
        requester: true,
      },
    });
    return friendships;
  }

  async findFriendsByUserId(userId: string): Promise<Friendship[]> {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { requesterId: userId },
          { addresseeId: userId },
        ],
        status: "ACCEPTED",
      },
      include: {
        requester: true,
        addressee: true,
      },
    });
    return friendships;
  }

  async findById(id: string): Promise<Friendship | null> {
    const friendship = await prisma.friendship.findUnique({
      where: { id },
      include: {
        requester: true,
        addressee: true,
      },
    });
    return friendship;
  }

  async save(friendship: Friendship): Promise<Friendship> {
    const updatedFriendship = await prisma.friendship.update({
      where: { id: friendship.id },
      data: {
        status: friendship.status,
      },
    });
    return updatedFriendship;
  }
}
