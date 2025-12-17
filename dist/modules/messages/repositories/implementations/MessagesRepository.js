"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MessagesRepository {
    async create({ senderId, receiverId, content }) {
        const message = await prisma.message.create({
            data: {
                senderId,
                receiverId,
                content,
            },
        });
        return message;
    }
    async listByUser(userId) {
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
exports.MessagesRepository = MessagesRepository;
