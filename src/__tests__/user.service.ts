import UserService from '../services/UserService'
import { User } from '../entity/User'
const auth = require('../utils/auth')
const typeorm = require('typeorm')

describe('User service', () => {
  describe('getUsers', () => {
    it('should get Users', async () => {
      typeorm.createQueryBuilder = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue('return')
      })
      const result = await UserService.getUsers()
      const queryBuilder = typeorm.createQueryBuilder()

      expect(result).toBe('return')
      expect(queryBuilder.select).toBeCalledWith('user')
      expect(queryBuilder.from).toBeCalledWith(User, 'user')
    })
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = { username: 'user', password: 'pass' }
      auth.hash = jest.fn().mockImplementation(async p => p) // mock auth
      UserService.findById = jest.fn().mockResolvedValue(user)

      typeorm.getRepository = jest.fn().mockReturnValue({
        save: jest.fn().mockResolvedValue(user => user)
      })

      const response = await UserService.createUser(user.username, user.password)
      expect(response).toEqual(expect.objectContaining(user))
      expect(typeorm.getRepository().save).toHaveBeenCalledWith(user)
    })
  })
})
