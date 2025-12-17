import "reflect-metadata";

import { container } from "tsyringe"; // Ensure imported
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

import { IEventsRepository } from "../../modules/events/repositories/IEventsRepository";
import { EventsRepository } from "../../modules/events/repositories/implementations/EventsRepository";

container.registerSingleton<IEventsRepository>(
  "EventsRepository",
  EventsRepository
);

import { IRegistrationsRepository } from "../../modules/events/repositories/IRegistrationsRepository";
import { RegistrationsRepository } from "../../modules/events/repositories/implementations/RegistrationsRepository";

container.registerSingleton<IRegistrationsRepository>(
  "RegistrationsRepository",
  RegistrationsRepository
);

import { IFriendshipsRepository } from "../../modules/social/repositories/IFriendshipsRepository";
import { FriendshipsRepository } from "../../modules/social/repositories/implementations/FriendshipsRepository";

container.registerSingleton<IFriendshipsRepository>(
  "FriendshipsRepository",
  FriendshipsRepository
);

import { IMessagesRepository } from "../../modules/messages/repositories/IMessagesRepository";
import { MessagesRepository } from "../../modules/messages/repositories/implementations/MessagesRepository";

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);

import { IReviewsRepository } from "../../modules/events/repositories/IReviewsRepository";
import { ReviewsRepository } from "../../modules/events/repositories/implementations/ReviewsRepository";

container.registerSingleton<IReviewsRepository>(
  "ReviewsRepository",
  ReviewsRepository
);
