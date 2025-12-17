import { PrismaClient, Review } from "@prisma/client";
import { ICreateReviewDTO, IReviewsRepository } from "../IReviewsRepository";

const prisma = new PrismaClient();

export class ReviewsRepository implements IReviewsRepository {
  async create({ userId, eventId, rating, comment }: ICreateReviewDTO): Promise<Review> {
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

  async findByUserAndEvent(userId: string, eventId: string): Promise<Review | null> {
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

  async findByUserId(userId: string): Promise<Review[]> {
    const reviews = await prisma.review.findMany({
      where: {
        userId,
      },
    });
    return reviews;
  }

  async calculateOverallRating(eventId: string): Promise<number> {
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
