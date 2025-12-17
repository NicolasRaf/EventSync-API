
import { inject, injectable } from "tsyringe";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class DeleteEventUseCase {
  constructor(
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute(id: string, userId: string): Promise<void> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError("Event not found", 404);
    }

    if (event.organizerId !== userId) {
      throw new AppError("You do not have permission to delete this event", 403);
    }

    // Prisma cascade delete is configured in schema, so just deleting the event is enough.
    await this.eventsRepository.delete(id);
  }
}
