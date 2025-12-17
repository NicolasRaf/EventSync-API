"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RespondFriendRequestController = void 0;
const tsyringe_1 = require("tsyringe");
const RespondFriendRequestUseCase_1 = require("./RespondFriendRequestUseCase");
class RespondFriendRequestController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { requestId } = request.params;
        const { accept } = request.body;
        const respondFriendRequestUseCase = tsyringe_1.container.resolve(RespondFriendRequestUseCase_1.RespondFriendRequestUseCase);
        const friendship = await respondFriendRequestUseCase.execute({
            userId,
            requestId,
            accept,
        });
        return response.json(friendship);
    }
}
exports.RespondFriendRequestController = RespondFriendRequestController;
