"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageController = void 0;
const tsyringe_1 = require("tsyringe");
const SendMessageUseCase_1 = require("./SendMessageUseCase");
class SendMessageController {
    async handle(request, response) {
        const { id: senderId } = request.user;
        const { receiverId, content } = request.body;
        const sendMessageUseCase = tsyringe_1.container.resolve(SendMessageUseCase_1.SendMessageUseCase);
        const message = await sendMessageUseCase.execute({
            senderId,
            receiverId,
            content,
        });
        return response.status(201).json(message);
    }
}
exports.SendMessageController = SendMessageController;
