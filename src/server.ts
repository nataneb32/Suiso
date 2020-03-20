import * as express from 'express'
import UserController from './controllers/UserController'
import CourseController from './controllers/CourseController'

const server = express()

server.use(express.json())
server.post('/signin/', UserController.store)
server.post('/login/', UserController.login)
server.use(UserController.verify)
server.get('/users/', UserController.index)
server.post('/course/', CourseController.store)
server.get('/course/', CourseController.index)

export default server
