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
exports.CancelRegistrationUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let CancelRegistrationUseCase = class CancelRegistrationUseCase {
    constructor(registrationsRepository) {
        this.registrationsRepository = registrationsRepository;
    }
    async execute({ userId, registrationId }) {
        const registration = await this.registrationsRepository.findById(registrationId);
        if (!registration) {
            throw new AppError_1.AppError("Registration not found", 404);
        }
        if (registration.userId !== userId) {
            throw new AppError_1.AppError("You can only cancel your own registrations", 403);
        }
        await this.registrationsRepository.deleteById(registrationId);
    }
};
exports.CancelRegistrationUseCase = CancelRegistrationUseCase;
exports.CancelRegistrationUseCase = CancelRegistrationUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RegistrationsRepository")),
    __metadata("design:paramtypes", [Object])
], CancelRegistrationUseCase);
