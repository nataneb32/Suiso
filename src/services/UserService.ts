import { createQueryBuilder, getRepository } from 'typeorm'
import { User } from '../entity/User'
import { hash } from '../utils/auth'

class UserService {
  public async getUsers (): Promise<User[]> {
    return createQueryBuilder().select('user')
      .from(User, 'user')
      .getMany()
  }

  public async createUser (username: string, password: string): Promise<User | void> {
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

  public async findByUsernameAndGetPasswordHash (username: string): Promise<User> {
    return getRepository(User).createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne()
  }

  public async findByUsername (username: string): Promise<User> {
    return getRepository(User).createQueryBuilder('user').where('user.username = :username', { username }).getOne()
  }
}

export default new UserService()
