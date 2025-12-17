import { inject, injectable } from "tsyringe";
import { Review } from "@prisma/client";
import { IReviewsRepository } from "../../repositories/IReviewsRepository";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  userId: string;
  eventId: string;
  rating: number;
  comment?: string;
}

@injectable()
export class CreateReviewUseCase {
  constructor(
    @inject("ReviewsRepository")
    private reviewsRepository: IReviewsRepository,
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository,
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute({ userId, eventId, rating, comment }: IRequest): Promise<Review> {
    // 1. Check if event exists
    const event = await this.eventsRepository.findById(eventId);
    if (!event) {
      throw new AppError("Event not found", 404);
    }

    // 2. Check if user has a registration and checked in
    const registration = await this.registrationsRepository.findByUserAndEvent(userId, eventId);
    
    if (!registration) {
      throw new AppError("User is not registered for this event", 403);
    }

    // Check-in validation
    if (!registration.checkedInAt) {
      throw new AppError("You must check-in to review this event", 400);
    }

    // 3. Check if user already reviewed
    const existingReview = await this.reviewsRepository.findByUserAndEvent(userId, eventId);
    if (existingReview) {
      throw new AppError("User has already reviewed this event", 400);
    }

    // 4. Create Review
    const review = await this.reviewsRepository.create({
      userId,
      eventId,
      rating,
      comment,
    });

    // 5. Update overall rating
    const averageRating = await this.reviewsRepository.calculateOverallRating(eventId);
    
    await this.eventsRepository.update(eventId, { overallRating: averageRating });

    return review;
  }
}
