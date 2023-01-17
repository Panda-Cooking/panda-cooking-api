import { Router } from "express";
import { listCategoriesController } from "../controllers/categories/getCategories.controller";

const categoriesRoutes = Router();

categoriesRoutes.get("", listCategoriesController);

export default categoriesRoutes;
