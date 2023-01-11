import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";
import commentsRoutes from "./routes/comments.routes";
import recipesRouter from "./routes/recipes.routes";

const app = express();

/** routes here */

app.use("/recipes", recipesRouter);
app.use("/comments", commentsRoutes);

app.use(handlerError);

export default app;
