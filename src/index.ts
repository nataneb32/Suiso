import 'reflect-metadata'
import { createConnection } from 'typeorm'
import UserService from './services/UserService'
import { User } from './entity/User'

createConnection().then(async () => {
  await UserService.createUser('test', '123456')
  UserService.getUsers().then(async (users: User[]) => {
    console.log(users)
  })
})
