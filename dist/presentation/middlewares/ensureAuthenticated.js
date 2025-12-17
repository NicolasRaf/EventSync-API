"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = ensureAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({ message: "Token missing" });
    }
    // Bearer <token>
    const [, token] = authHeader.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET || "default_secret");
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        return response.status(401).json({ message: "Invalid token" });
    }
}
