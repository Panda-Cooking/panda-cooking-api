import { Request, Response } from "express";
import listCategoriesService from "../../services/categories/getAllCategories.service";

export const listCategoriesController = async (req: Request, resp: Response) => {
  const categories = await listCategoriesService();
  return resp.json(categories);
};