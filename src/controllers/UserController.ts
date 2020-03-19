import { Request, Response } from 'express'
import UserService from '../services/UserService'

class UserController {
  public async index (req: Request, res: Response): Promise<void> {
    const users = await UserService.getUsers()
    res.json(users.map((user) => { return { id: user.id, username: user.username } }))
  }

  public async store (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body
    const newUser = await UserService.createUser(username, password)
    res.json(newUser)
  }
}

export default new UserController()
