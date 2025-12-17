import { inject, injectable } from "tsyringe";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
export class CancelRegistrationUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository
  ) {}

  async execute({ userId, registrationId }: { userId: string; registrationId: string }): Promise<void> {
    const registration = await this.registrationsRepository.findById(registrationId);

    if (!registration) {
      throw new AppError("Registration not found", 404);
    }

    if (registration.userId !== userId) {
      throw new AppError("You can only cancel your own registrations", 403);
    }

    await this.registrationsRepository.deleteById(registrationId);
  }
}
