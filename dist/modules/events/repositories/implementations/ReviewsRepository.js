"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReviewsRepository {
    async create({ userId, eventId, rating, comment }) {
        const review = await prisma.review.create({
            data: {
                userId,
                eventId,
                rating,
                comment,
            },
        });
        return review;
    }
    async findByUserAndEvent(userId, eventId) {
        const review = await prisma.review.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId,
                },
            },
        });
        return review;
    }
    async findByUserId(userId) {
        const reviews = await prisma.review.findMany({
            where: {
                userId,
            },
        });
        return reviews;
    }
    async calculateOverallRating(eventId) {
        const aggregations = await prisma.review.aggregate({
            _avg: {
                rating: true,
            },
            where: {
                eventId,
            },
        });
        return aggregations._avg.rating || 0;
    }
}
exports.ReviewsRepository = ReviewsRepository;
