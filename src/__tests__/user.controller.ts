import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import { Request, Response } from 'express'
const auth = require('../utils/auth')

describe('UserController', () => {
  describe('login', () => {
    it('should login', async () => {
      const user = {
        username: 'user',
        password: 'hash'
      }
      UserService.findByUsername = jest.fn().mockResolvedValue(user)
      const req = {
        body: {
          username: user.username,
          password: '123456'
        }
      }

      auth.compareWithHash = jest.fn(() => true)
      const res: any = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }

      await UserController.login(req as Request, res as Response)
      expect(auth.compareWithHash).toHaveBeenCalledWith(req.body.password, user.password)
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        username: user.username,
        token: expect.anything()
      }))
    })
  })
})
