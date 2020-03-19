import { createQueryBuilder, getRepository } from 'typeorm'
import { User } from '../entity/User'
import { hash } from '../utils/auth'

class UserService {
  public async getUsers (): Promise<User[]> {
    return createQueryBuilder().select('user')
      .from(User, 'user')
      .getMany()
  }

  public async createUser (username: string, password: string): Promise<User> {
    const user = new User()
    Object.assign(user, {
      username,
      password: await hash(password) // save a hash password
    })

    const response = await getRepository(User).save(user)
    return this.findById(response.id)
  }

  public async findById (id: number): Promise<User> {
    return getRepository(User).createQueryBuilder('user').where('user.id = :id', { id }).getOne()
  }
}

export default new UserService()
