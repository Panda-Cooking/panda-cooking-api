import { Request, Response, NextFunction } from 'express'
import AppDataSource from '../data-source';
import { Recipe } from '../entities/recipes.entity';
import { User } from '../entities/users.entity';
import AppError from '../errors/appError';

const validatedIsAdmMiddleware = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {

  const userRepository = AppDataSource.getRepository(User);

  const findRecipe = await userRepository.findOneBy({
    id: req.userId,
});
  
  const isAdm = findRecipe.isAdm
  const id = req.userId
  const params = req.params.id
  
  if (isAdm) {
    return next()
  }

  if (id != params) {
    throw new AppError('unauthorized', 401)
  }

  return next()
}

export default validatedIsAdmMiddleware
