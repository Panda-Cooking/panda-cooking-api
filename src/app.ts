import express from "express";
import handlerError from "./errors/handlerError";
import commentsRoutes from "./routes/comments.routes";
import recipesRouter from "./routes/recipes.routes";
import usersRouter from "./routes/users.routes";

import "express-async-errors";

const app = express();
app.use(express.json());

app.use(express.json())
/** routes here */

app.use("/recipes", recipesRouter);

app.use("/users", usersRouter);


app.use(handlerError);

export default app;
