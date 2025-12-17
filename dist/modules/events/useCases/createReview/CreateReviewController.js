"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewController = void 0;
const tsyringe_1 = require("tsyringe");
const CreateReviewUseCase_1 = require("./CreateReviewUseCase");
class CreateReviewController {
    async handle(request, response) {
        const { id: userId } = request.user;
        const { eventId } = request.params;
        const { rating, comment } = request.body;
        const createReviewUseCase = tsyringe_1.container.resolve(CreateReviewUseCase_1.CreateReviewUseCase);
        try {
            const review = await createReviewUseCase.execute({
                userId,
                eventId,
                rating: Number(rating),
                comment,
            });
            return response.status(201).json(review);
        }
        catch (error) {
            console.error("Error creating review:", error); // Log the authentic error
            throw error; // Let the global exception handler manage the response
        }
    }
}
exports.CreateReviewController = CreateReviewController;
