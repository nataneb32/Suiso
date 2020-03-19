import { createQueryBuilder, getRepository } from 'typeorm'
import { User } from '../entity/User'

class UserService {
  public async getUsers (): Promise<User[]> {
    return createQueryBuilder().select('user')
      .from(User, 'user')
      .getMany()
  }

  public async createUser (username: string, password: string): Promise<User> {
    const user = new User()
    user.username = username
    user.password = password
    const response = await getRepository(User).save(user)
    return this.findById(response.id)
  }

  public async findById (id: number): Promise<User> {
    return getRepository(User).createQueryBuilder('user').where('user.id = :id', { id }).getOne()
  }
}

export default new UserService()
