import "reflect-metadata";
import "./shared/container";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from 'cors';
import { routes } from './presentation/routes';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);


// Global Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

export { app };
