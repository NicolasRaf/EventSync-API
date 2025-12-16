import { Prisma, Event, Registration } from "@prisma/client";

export interface IEventsRepository {
  create(data: Prisma.EventCreateInput): Promise<Event>;
  listAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  findRegistrationsByUserId(userId: string): Promise<Registration[]>;
}

