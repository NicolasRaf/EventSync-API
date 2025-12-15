import { Prisma, Event } from "@prisma/client";

export interface IEventsRepository {
  create(data: Prisma.EventCreateInput): Promise<Event>;
  listAll(): Promise<Event[]>;
}

