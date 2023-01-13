"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth/auth.controller");
const verifySchema_middleware_1 = require("../middlewares/verifySchema.middleware");
const authSchema_1 = require("../schemas/auth/authSchema");
const authRouter = (0, express_1.Router)();
authRouter.post("", (0, verifySchema_middleware_1.verifySchemaMiddleware)(authSchema_1.authSchemaRequest), auth_controller_1.authController);
exports.default = authRouter;
