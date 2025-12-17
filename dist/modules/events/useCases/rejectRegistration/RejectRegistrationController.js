"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectRegistrationController = void 0;
const tsyringe_1 = require("tsyringe");
const RejectRegistrationUseCase_1 = require("./RejectRegistrationUseCase");
class RejectRegistrationController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { id: registrationId } = request.params;
        const rejectRegistrationUseCase = tsyringe_1.container.resolve(RejectRegistrationUseCase_1.RejectRegistrationUseCase);
        await rejectRegistrationUseCase.execute({
            registrationId,
            userId,
        });
        return response.status(204).send();
    }
}
exports.RejectRegistrationController = RejectRegistrationController;
