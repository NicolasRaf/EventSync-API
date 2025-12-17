"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let CreateReviewUseCase = class CreateReviewUseCase {
    constructor(reviewsRepository, eventsRepository, registrationsRepository) {
        this.reviewsRepository = reviewsRepository;
        this.eventsRepository = eventsRepository;
        this.registrationsRepository = registrationsRepository;
    }
    async execute({ userId, eventId, rating, comment }) {
        // 1. Check if event exists
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            throw new AppError_1.AppError("Event not found", 404);
        }
        // 2. Check if user has a registration and checked in
        const registration = await this.registrationsRepository.findByUserAndEvent(userId, eventId);
        if (!registration) {
            throw new AppError_1.AppError("User is not registered for this event", 403);
        }
        // Check-in validation
        if (!registration.checkedInAt) {
            throw new AppError_1.AppError("You must check-in to review this event", 400);
        }
        // 3. Check if user already reviewed
        const existingReview = await this.reviewsRepository.findByUserAndEvent(userId, eventId);
        if (existingReview) {
            throw new AppError_1.AppError("User has already reviewed this event", 400);
        }
        // 4. Create Review
        const review = await this.reviewsRepository.create({
            userId,
            eventId,
            rating,
            comment,
        });
        // 5. Update overall rating
        const averageRating = await this.reviewsRepository.calculateOverallRating(eventId);
        event.overallRating = averageRating;
        await this.eventsRepository.update(event);
        return review;
    }
};
exports.CreateReviewUseCase = CreateReviewUseCase;
exports.CreateReviewUseCase = CreateReviewUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ReviewsRepository")),
    __param(1, (0, tsyringe_1.inject)("EventsRepository")),
    __param(2, (0, tsyringe_1.inject)("RegistrationsRepository")),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateReviewUseCase);
