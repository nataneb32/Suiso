import * as express from 'express'
import UserController from './controllers/UserController'

const server = express()

server.use(express.json())
server.get('/users/', UserController.index)
server.post('/signin/', UserController.store)
server.post('/login/', UserController.login)

export default server
