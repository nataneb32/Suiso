import { shield, rule, not, inputRule, and } from 'graphql-shield'
import { verify } from '../../utils/jwt'

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  const authorize = ctx.request.get('Authorization')
  
  return !!verify(authorize)
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
