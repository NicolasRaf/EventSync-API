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
exports.ApproveRegistrationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let ApproveRegistrationUseCase = class ApproveRegistrationUseCase {
    constructor(registrationsRepository) {
        this.registrationsRepository = registrationsRepository;
    }
    async execute({ registrationId, userId }) {
        const registration = await this.registrationsRepository.findById(registrationId);
        if (!registration) {
            throw new AppError_1.AppError("Registration not found", 404);
        }
        // Check if the user is the organizer of the event
        // The repository's findById includes the event, so we can check organizerId
        if (registration.event.organizerId !== userId) {
            throw new AppError_1.AppError("Not authorized", 401);
        }
        if (registration.status !== "PENDING") {
            throw new AppError_1.AppError("Registration is already handled");
        }
        await this.registrationsRepository.updateStatus(registrationId, "APPROVED");
    }
};
exports.ApproveRegistrationUseCase = ApproveRegistrationUseCase;
exports.ApproveRegistrationUseCase = ApproveRegistrationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RegistrationsRepository")),
    __metadata("design:paramtypes", [Object])
], ApproveRegistrationUseCase);
