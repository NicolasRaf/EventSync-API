import { inject, injectable } from "tsyringe";
import { IRegistrationsRepository } from "../../repositories/IRegistrationsRepository";
import { IEventsRepository } from "../../repositories/IEventsRepository";
import { Registration } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";

interface ICreateRegistrationRequest {
  userId: string;
  eventId: string;
}

@injectable()
export class CreateRegistrationUseCase {
  constructor(
    @inject("RegistrationsRepository")
    private registrationsRepository: IRegistrationsRepository,
    
    @inject("EventsRepository")
    private eventsRepository: IEventsRepository
  ) {}

  async execute({ userId, eventId }: ICreateRegistrationRequest): Promise<Registration> {
    // 1. Buscar o evento para validar regras
    const event = await this.eventsRepository.findById(eventId);

    if (!event) {
      throw new AppError("Event not found", 404);
    }

    // 2. Regra: Organizador não pode se inscrever no próprio evento
    if (event.organizerId === userId) {
      throw new AppError("Organizers cannot subscribe to their own events", 403);
    }

    // 3. Verificar se já existe inscrição
    const registrationAlreadyExists = await this.registrationsRepository.findByUserAndEvent(
      userId,
      eventId
    );

    if (registrationAlreadyExists) {
      throw new AppError("User already registered to this event", 409);
    }

    // 4. Criar inscrição
    const registration = await this.registrationsRepository.create({
      userId,
      eventId,
    });

    return registration;
  }
}
