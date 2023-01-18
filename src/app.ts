import express from "express";
import "express-async-errors";
import handlerError from "./errors/handlerError";
import authRouter from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.routes";
import commentsRoutes from "./routes/comments.routes";
import favoriteRecipesRouter from "./routes/favoriteRecipes.routes";
import recipesRouter from "./routes/recipes.routes";
import usersRouter from "./routes/users.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/comments", commentsRoutes);
app.use("/users", usersRouter);
app.use("/categories", categoriesRoutes);
app.use("/favoriterecipes", favoriteRecipesRouter);

app.use(handlerError);

export default app;
