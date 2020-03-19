import * as express from 'express'
import UserController from './controllers/UserController'

const server = express()

server.use(express.json())
server.post('/signin/', UserController.store)
server.post('/login/', UserController.login)
server.use(UserController.verify)
server.get('/users/', UserController.index)

export default server
