"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformCheckInController = void 0;
const tsyringe_1 = require("tsyringe");
const PerformCheckInUseCase_1 = require("./PerformCheckInUseCase");
class PerformCheckInController {
    async handle(request, response) {
        const { eventId } = request.params;
        const { participantId } = request.body;
        const performCheckInUseCase = tsyringe_1.container.resolve(PerformCheckInUseCase_1.PerformCheckInUseCase);
        const registration = await performCheckInUseCase.execute({
            eventId,
            participantId,
        });
        return response.json(registration);
    }
}
exports.PerformCheckInController = PerformCheckInController;
