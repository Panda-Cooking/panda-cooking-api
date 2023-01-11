import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";
import commentsRoutes from "./routes/comments.routes";
import recipesRouter from "./routes/recipes.routes";

const app = express();

app.use(express.json())
/** routes here */

app.use("/recipes", recipesRouter);
app.use("", commentsRoutes);

app.use(handlerError);

export default app;
