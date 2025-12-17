"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsController = void 0;
const tsyringe_1 = require("tsyringe");
const ListEventsUseCase_1 = require("./ListEventsUseCase");
const jsonwebtoken_1 = require("jsonwebtoken");
class ListEventsController {
    async handle(request, response) {
        const listEventsUseCase = tsyringe_1.container.resolve(ListEventsUseCase_1.ListEventsUseCase);
        let userId;
        const authHeader = request.headers.authorization;
        if (authHeader) {
            const [, token] = authHeader.split(" ");
            try {
                const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "default_secret");
                userId = sub;
            }
            catch {
                // Token invalid, ignore
            }
        }
        const events = await listEventsUseCase.execute(userId);
        return response.json(events);
    }
}
exports.ListEventsController = ListEventsController;
