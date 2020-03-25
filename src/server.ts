// import UserController from './controllers/UserController'
// import CourseController from './controllers/CourseController'
import { GraphQLServer } from 'graphql-yoga'
import UserResolvers from './resolvers/UserResolvers'
import CourseResolvers from './resolvers/CourseResolvers'
import middlewares from './graphql/middlewares'

class Server extends GraphQLServer {
  constructor () {
    super({
      typeDefs: './src/graphql/schemas.graphql',
      resolvers: [
        UserResolvers,
        CourseResolvers
      ],
      middlewares,
      context: (ctx) => ({ ...ctx })
    })
  }
}

export default new Server()
