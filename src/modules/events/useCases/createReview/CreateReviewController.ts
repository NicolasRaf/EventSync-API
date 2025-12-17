import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateReviewUseCase } from "./CreateReviewUseCase";

export class CreateReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;
    const { eventId } = request.params;
    const { rating, comment } = request.body;

    const createReviewUseCase = container.resolve(CreateReviewUseCase);

    try {
      const review = await createReviewUseCase.execute({
        userId,
        eventId,
        rating: Number(rating),
        comment,
      });

      return response.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error); // Log the authentic error
      throw error; // Let the global exception handler manage the response
    }
  }
}
