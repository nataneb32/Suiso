import UserController from '../controllers/UserController'
import UserService from '../services/UserService'
import { Request, Response } from 'express'
const auth = require('../utils/auth')
const jwt = require('../utils/jwt')

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

  describe('verify User middleware', () => {
    it('should call next with valid token', async () => {
      jwt.verify = jest.fn().mockResolvedValue(true)

      const req = {
        headers: {
          authorization: 'Bearer token'
        }
      }

      jwt.verify = jest.fn(() => true)
      const res: any = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
      const next = jest.fn()

      await UserController.verify(req as Request, res, next)
      expect(next).toHaveBeenCalledTimes(1)
      expect(jwt.verify).toHaveBeenCalledWith('token')
    })
    it('shouldn\'t call next with invalid token', async () => {
      jwt.verify = jest.fn().mockResolvedValue(true)

      const req = {
        headers: {
          authorization: 'Bearer invalid_token'
        }
      }

      jwt.verify = jest.fn((token) => token === 'token')
      const res: any = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      }
      const next = jest.fn()

      await UserController.verify(req as Request, res, next)
      expect(next).toHaveBeenCalledTimes(0)
      expect(jwt.verify).toHaveBeenCalledWith('invalid_token')
      expect(res.status).toBeCalledWith(500)
    })
  })
})
