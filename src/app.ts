import express from "express";
import handlerError from "./errors/handlerError";
import userRoutes from "./routes/user.routes";
import "express-async-errors";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

/** routes here */

app.use(handlerError);

export default app;
