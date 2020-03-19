import { Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  public async index (req: Request, res: Response) {
    res.json(await UserService.getUsers())
  }
}

export default new UserController()
