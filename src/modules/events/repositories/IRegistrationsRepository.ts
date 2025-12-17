import { Prisma, Registration } from "@prisma/client";

export interface IRegistrationsRepository {
  create(data: Prisma.RegistrationUncheckedCreateInput): Promise<Registration>;
  findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null>;
  findByEvent(eventId: string): Promise<Registration[]>;
  findById(id: string): Promise<Registration | null>;
  updateStatus(id: string, status: string): Promise<void>;
  update(registration: Registration): Promise<Registration>;
  delete(userId: string, eventId: string): Promise<void>;
  deleteById(id: string): Promise<void>;
}
