import * as express from 'express'
import UserController from './controllers/UserController'

const server = express()

server.use(express.json())
server.get('/users/', UserController.index)
server.post('/user/', UserController.store)

export default server
