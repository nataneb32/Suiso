import { Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService'
import { compareWithHash } from '../utils/auth'
import { createToken, verify } from '../utils/jwt'

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

  public async login (req: Request, res: Response) {
    try {
      const { username, password } = req.body
      const user = await UserService.findByUsername(username)
      if (!compareWithHash(password, user.password)) throw Error('Senha invalida.')

      res.status(200).json({
        username: username,
        token: createToken({
          userId: user.id
        })
      })
    } catch (err) {
      res.status(400).send(err.message)
    }
  }

  public async verify (req: Request, res: Response, next: NextFunction) {
    try {
      const authToken: string = req.headers.authorization && req.headers.authorization.split(' ')[1]
      if (!verify(authToken)) throw Error("Auth token isn't valid.")
      next()
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
}

export default new UserController()
