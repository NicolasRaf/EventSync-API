import { inject, injectable } from "tsyringe";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { Event } from "@prisma/client";

import { IReviewsRepository } from "../../repositories/IReviewsRepository";

@injectable()
export class ListEventsUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository,
    @inject("ReviewsRepository")
    private reviewsRepository: IReviewsRepository
  ) {}

  async execute(userId?: string): Promise<any[]> {
    const events = await this.eventsRepository.listAll();
    
    if (!userId) {
       return events.map(event => ({ ...event, userHasReviewed: false }));
    }

    const userReviews = await this.reviewsRepository.findByUserId(userId);
    const reviewedEventIds = new Set(userReviews.map(r => r.eventId));
    
    return events.map(event => ({
      ...event,
      userHasReviewed: reviewedEventIds.has(event.id)
    }));
  }
}
