"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe"); // Ensure imported
const UsersRepository_1 = require("../../modules/users/repositories/implementations/UsersRepository");
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
const EventsRepository_1 = require("../../modules/events/repositories/implementations/EventsRepository");
tsyringe_1.container.registerSingleton("EventsRepository", EventsRepository_1.EventsRepository);
const RegistrationsRepository_1 = require("../../modules/events/repositories/implementations/RegistrationsRepository");
tsyringe_1.container.registerSingleton("RegistrationsRepository", RegistrationsRepository_1.RegistrationsRepository);
const FriendshipsRepository_1 = require("../../modules/social/repositories/implementations/FriendshipsRepository");
tsyringe_1.container.registerSingleton("FriendshipsRepository", FriendshipsRepository_1.FriendshipsRepository);
const MessagesRepository_1 = require("../../modules/messages/repositories/implementations/MessagesRepository");
tsyringe_1.container.registerSingleton("MessagesRepository", MessagesRepository_1.MessagesRepository);
const ReviewsRepository_1 = require("../../modules/events/repositories/implementations/ReviewsRepository");
tsyringe_1.container.registerSingleton("ReviewsRepository", ReviewsRepository_1.ReviewsRepository);
