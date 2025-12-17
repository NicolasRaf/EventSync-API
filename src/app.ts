import "reflect-metadata";
import "./shared/container";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import { routes } from './presentation/routes';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { AppError } from "./shared/errors/AppError";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);


// Global Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

export { app };
