import { Request, Response } from 'express'
import CourseService from '../services/CourseService'

class CourseController {
  public async index (req: Request, res: Response):Promise<void> {
    try {
      res.json(await CourseService.getCourses())
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  public async show (req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      res.json(await CourseService.getCourse(parseInt(id)))
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  public async store (req: Request, res: Response): Promise<void> {
    try {
      const { user, name, price } = req.body
      if (!name) throw Error("Name can't be null.")
      if (!price) throw Error("Price can't be null.")

      const course = await CourseService.createCourse(user.id, name, price)
      res.json(course)
    } catch (err) {
      res.status(400).send(err.message)
    }
  }
}

export default new CourseController()
