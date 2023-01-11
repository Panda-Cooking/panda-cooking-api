import { Request, Response} from 'express'
import { iCommentRequest } from '../../interfaces/comments/commentsInterface'
import createCommentService from '../../services/comments/createComment.service'


const createCommentController = async (req: Request, res: Response) =>{

    const commentData: iCommentRequest = req.body
    const newComment = await createCommentService(commentData)

    return res.status(201).json(newComment)
}

export default createCommentController