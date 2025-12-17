import { inject, injectable } from "tsyringe";
import { Event } from "@prisma/client";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";

interface IResponse {
  event: Event;
  participants: {
    id: string;
    name: string;
  }[];
}

import { IReviewsRepository } from "../../repositories/IReviewsRepository";

@injectable()
export class GetEventDetailsUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository,
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository,
    @inject("ReviewsRepository")
    private reviewsRepository: IReviewsRepository
  ) {}

  async execute(eventId: string, userId: string): Promise<any> {
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    const registrations = await this.registrationsRepository.findByEvent(eventId);

    // Map registrations to basic participant info (id and name) from the embedded 'user' object
    // Assuming 'user' is included in registrations from the findByEvent implementation
    const participants = registrations.map((reg: any) => ({
      id: reg.user.id,
      name: reg.user.name,
    }));

    let userHasReviewed = false;
    if (userId) {
       const review = await this.reviewsRepository.findByUserAndEvent(userId, eventId);
       userHasReviewed = !!review;
    }

    return {
      ...event,
      participants,
      userHasReviewed
    };
  }
}
