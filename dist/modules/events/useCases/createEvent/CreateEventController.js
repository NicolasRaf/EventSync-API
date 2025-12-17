"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventController = void 0;
const tsyringe_1 = require("tsyringe");
const zod_1 = require("zod");
const CreateEventUseCase_1 = require("./CreateEventUseCase");
class CreateEventController {
    async handle(request, response) {
        const createEventBodySchema = zod_1.z.object({
            title: zod_1.z.string(),
            description: zod_1.z.string(),
            date: zod_1.z.coerce.date(),
            locationType: zod_1.z.enum(["ONLINE", "IN_PERSON"]),
            location: zod_1.z.string().optional(),
            onlineUrl: zod_1.z.string().url().optional(),
        }).refine((data) => {
            if (data.locationType === "IN_PERSON" && !data.location) {
                return false;
            }
            return true;
        }, {
            message: "Location is required for IN_PERSON events",
            path: ["location"],
        }).refine((data) => {
            if (data.locationType === "ONLINE" && !data.onlineUrl) {
                // Making onlineUrl optional in schema but maybe we want to enforce it? 
                // User prompt said "optional onlineUrl", but "Address... mandatory if IN_PERSON".
                // It didn't explicitly say onlineUrl is mandatory if ONLINE, checking prompt: "Adicione um campo opcional onlineUrl".
                // "Se locationType for ONLINE, address pode ser nulo".
                return true;
            }
            return true;
        });
        const { title, description, date, location, locationType, onlineUrl } = createEventBodySchema.parse(request.body);
        const { id: organizerId } = request.user;
        const createEventUseCase = tsyringe_1.container.resolve(CreateEventUseCase_1.CreateEventUseCase);
        const event = await createEventUseCase.execute({
            title,
            description,
            date,
            location,
            locationType,
            onlineUrl,
            organizerId,
        });
        return response.status(201).json(event);
    }
}
exports.CreateEventController = CreateEventController;
