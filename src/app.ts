import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";
import recipesRouter from "./routes/recipes.routes";

const app = express();

/** routes here */

app.use("/recipes", recipesRouter);

app.use(handlerError);

export default app;
