"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRegistrationController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateRegistrationUseCase_1 = require("./CreateRegistrationUseCase");
const zod_1 = require("zod");
class CreateRegistrationController {
    async handle(request, response) {
        const { eventId } = request.params;
        const { id: userId } = request.user;
        const createRegistrationParamsSchema = zod_1.z.object({
            eventId: zod_1.z.string().uuid(),
        });
        // Validate eventId is a valid UUID
        createRegistrationParamsSchema.parse({ eventId });
        const createRegistrationUseCase = tsyringe_1.container.resolve(CreateRegistrationUseCase_1.CreateRegistrationUseCase);
        try {
            const registration = await createRegistrationUseCase.execute({
                userId,
                eventId,
            });
            return response.status(201).json(registration);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CreateRegistrationController = CreateRegistrationController;
