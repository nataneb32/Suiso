import { shield, rule } from 'graphql-shield'
import { verify } from '../../utils/jwt'
import { EncodedUser } from '../../resolvers/UserResolvers'

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const authorize = ctx.request.get('Authorization')
  const decode = <EncodedUser>verify(authorize)
  args.userId = decode.userId
  console.log(authorize)
  return !!decode
})

export default shield({
  Query: {
    courses: isAuthenticated,
    users: isAuthenticated
  },
  Mutation: {
    createCourse: isAuthenticated
  }
}, { allowExternalErrors: true })
