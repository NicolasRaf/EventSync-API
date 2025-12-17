"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipsRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FriendshipsRepository {
    async create(data) {
        const friendship = await prisma.friendship.create({
            data,
        });
        return friendship;
    }
    async findByRequesterAndAddressee(requesterId, addresseeId) {
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
    async findPendingRequestsByUserId(userId) {
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
    async findFriendsByUserId(userId) {
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
    async findById(id) {
        const friendship = await prisma.friendship.findUnique({
            where: { id },
            include: {
                requester: true,
                addressee: true,
            },
        });
        return friendship;
    }
    async save(friendship) {
        const updatedFriendship = await prisma.friendship.update({
            where: { id: friendship.id },
            data: {
                status: friendship.status,
            },
        });
        return updatedFriendship;
    }
}
exports.FriendshipsRepository = FriendshipsRepository;
