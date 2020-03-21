// import UserController from './controllers/UserController'
// import CourseController from './controllers/CourseController'
import { GraphQLServer } from 'graphql-yoga'
import UserService from './services/UserService'

const server = new GraphQLServer({
  typeDefs: './src/graphql/schemas.graphql',
  resolvers: {
    Query: {
      users: () => UserService.getUsers()
    }
  }
})
export default server
