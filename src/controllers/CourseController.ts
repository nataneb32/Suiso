import { Request, Response } from 'express'
import CourseService from '../services/CourseService'

class CourseController {
  public async index (req: Request, res: Response):Promise<void> {
    try {
      res.send(CourseService.getCourses())
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  public async store (req: Request, res: Response): Promise<void> {
    try {
      const { userId, name, price } = req.body
      const course = await CourseService.createCourse(userId, name, price)
      res.json(course)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}

export default new CourseController()
