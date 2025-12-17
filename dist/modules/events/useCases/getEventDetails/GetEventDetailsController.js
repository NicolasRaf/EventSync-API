"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventDetailsController = void 0;
const tsyringe_1 = require("tsyringe");
const GetEventDetailsUseCase_1 = require("./GetEventDetailsUseCase");
class GetEventDetailsController {
    async handle(request, response) {
        const { eventId } = request.params;
        const { id: userId } = request.user;
        const getEventDetailsUseCase = tsyringe_1.container.resolve(GetEventDetailsUseCase_1.GetEventDetailsUseCase);
        const eventDetails = await getEventDetailsUseCase.execute(eventId, userId);
        return response.json(eventDetails);
    }
}
exports.GetEventDetailsController = GetEventDetailsController;
