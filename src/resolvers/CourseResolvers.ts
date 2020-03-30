import CourseService from '../services/CourseService'
export default {
  Query: {
    async courses (_, { limit, offset }) {
      return CourseService.getCourses(offset, limit)
    }
  },
  Mutation: {
    async createCourse (_, { userId, name, price, description, thumbnail }) {
      try {
        const a = await CourseService.createCourse(userId, name, price, description, thumbnail)
        return a
      } catch (err) {
        console.error(err)
        return null
      }
    }
  }
}
