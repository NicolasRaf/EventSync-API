import { Prisma, Registration } from "@prisma/client";

export interface IRegistrationsRepository {
  create(data: Prisma.RegistrationUncheckedCreateInput): Promise<Registration>;
  findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;
  update(registration: Registration): Promise<Registration>;
}

