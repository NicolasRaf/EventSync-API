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
exports.RespondFriendRequestUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const AppError_1 = require("../../../../shared/errors/AppError");
let RespondFriendRequestUseCase = class RespondFriendRequestUseCase {
    constructor(friendshipsRepository) {
        this.friendshipsRepository = friendshipsRepository;
    }
    async execute({ userId, requestId, accept }) {
        const friendship = await this.friendshipsRepository.findById(requestId);
        if (!friendship) {
            throw new AppError_1.AppError("Friend request not found", 404);
        }
        if (friendship.addresseeId !== userId) {
            throw new AppError_1.AppError("This friend request is not for you", 403);
        }
        if (friendship.status !== "PENDING") {
            throw new AppError_1.AppError("This friend request is already handled");
        }
        if (accept) {
            friendship.status = "ACCEPTED";
        }
        else {
            friendship.status = "REJECTED";
        }
        const updatedFriendship = await this.friendshipsRepository.save(friendship);
        return updatedFriendship;
    }
};
exports.RespondFriendRequestUseCase = RespondFriendRequestUseCase;
exports.RespondFriendRequestUseCase = RespondFriendRequestUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FriendshipsRepository")),
    __metadata("design:paramtypes", [Object])
], RespondFriendRequestUseCase);
