import express from "express";
import handlerError from "./errors/handlerError";
import "express-async-errors";

const app = express();
app.use(express.json());

/** routes here */

app.use(handlerError);

export default app;
