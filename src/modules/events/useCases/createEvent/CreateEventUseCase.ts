import { inject, injectable } from "tsyringe";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { Event, LocationType } from "@prisma/client";

interface ICreateEventRequest {
  title: string;
  description: string;
  date: Date;
  location?: string;
  locationType: LocationType;
  onlineUrl?: string;
  organizerId: string;
}

@injectable()
export class CreateEventUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute({
    title,
    description,
    date,
    location,
    locationType,
    onlineUrl,
    organizerId,
  }: ICreateEventRequest): Promise<Event> {
    const event = await this.eventsRepository.create({
      title,
      description,
      date,
      location,
      locationType,
      onlineUrl,
      organizer: {
        connect: {
          id: organizerId,
        },
      },
    });

    return event;
  }
}
