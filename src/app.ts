import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";
import recipesRouter from "./routes/recipes.routes";
import usersRouter from "./routes/users.routes";

const app = express();

/** routes here */

app.use("/recipes", recipesRouter);
app.use("/users", usersRouter)

app.use(handlerError);

export default app;
