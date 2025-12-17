"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelRegistrationController = void 0;
const tsyringe_1 = require("tsyringe");
const CancelRegistrationUseCase_1 = require("./CancelRegistrationUseCase");
class CancelRegistrationController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { id: registrationId } = request.params;
        const cancelRegistrationUseCase = tsyringe_1.container.resolve(CancelRegistrationUseCase_1.CancelRegistrationUseCase);
        await cancelRegistrationUseCase.execute({
            userId,
            registrationId,
        });
        return response.status(204).send();
    }
}
exports.CancelRegistrationController = CancelRegistrationController;
