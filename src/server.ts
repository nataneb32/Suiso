import * as express from 'express'
import UserController from './controllers/UserController'

const server = express()

server.use(express.json())
server.get('/posts/', UserController.index)

export default server
