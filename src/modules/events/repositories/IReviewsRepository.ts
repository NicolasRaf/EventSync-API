import { Review } from "@prisma/client";

export interface ICreateReviewDTO {
  userId: string;
  eventId: string;
  rating: number;
  comment?: string;
}

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>;
  findByUserAndEvent(userId: string, eventId: string): Promise<Review | null>;
  calculateOverallRating(eventId: string): Promise<number>;
  findByUserId(userId: string): Promise<Review[]>;
}
