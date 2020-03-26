import UserService from '../services/UserService'
import { compareWithHash } from '../utils/auth'
import { createToken } from '../utils/jwt'

export default {
  Query: {
    async users () {
      return UserService.getUsers()
    }
  },
  Mutation: {
    async createUser (_, { username, password }) {
      if (await UserService.findByUsername(username)) throw Error('This username has already been taken.')

      const a = UserService.createUser(username, password)
      return a
    },
    async login (_, { username, password }) {
      const user = await UserService.findByUsernameAndGetPasswordHash(username)
      if (!user) throw Error('User not found.')
      if (!(await compareWithHash(password, user.password))) throw Error('Wrong password.')

      return createToken({ userId: user.id })
    }
  }
}
