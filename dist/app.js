"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("./shared/container");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./presentation/routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const AppError_1 = require("./shared/errors/AppError");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.routes);
// Global Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
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
