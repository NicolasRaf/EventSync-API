import { inject, injectable } from "tsyringe";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  registrationId: string;
  userId: string; // Organizer ID
}

@injectable()
export class ApproveRegistrationUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute({ registrationId, userId }: IRequest): Promise<void> {
    const registration = await this.registrationsRepository.findById(registrationId);

    if (!registration) {
      throw new AppError("Registration not found", 404);
    }

    // Check if the user is the organizer of the event
    // The repository's findById includes the event, so we can check organizerId
    if ((registration as any).event.organizerId !== userId) {
      throw new AppError("Not authorized", 401);
    }

    if (registration.status !== "PENDING") {
       throw new AppError("Registration is already handled");
    }

    await this.registrationsRepository.updateStatus(registrationId, "APPROVED");
  }
}
