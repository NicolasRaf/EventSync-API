"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendFriendRequestController = void 0;
const tsyringe_1 = require("tsyringe");
const SendFriendRequestUseCase_1 = require("./SendFriendRequestUseCase");
class SendFriendRequestController {
    async handle(request, response) {
        const { id: addresseeId } = request.params;
        const { id: requesterId } = request.user;
        const sendFriendRequestUseCase = tsyringe_1.container.resolve(SendFriendRequestUseCase_1.SendFriendRequestUseCase);
        const friendship = await sendFriendRequestUseCase.execute({
            requesterId,
            addresseeId,
        });
        return response.status(201).json(friendship);
    }
}
exports.SendFriendRequestController = SendFriendRequestController;
