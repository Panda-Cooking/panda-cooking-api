import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";

const app = express();

/** routes here */

app.use(handlerError);

export default app;
