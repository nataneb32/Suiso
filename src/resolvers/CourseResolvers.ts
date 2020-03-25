import CourseService from '../services/CourseService'

export default {
  Query: {
    async courses (_, { limit, offset }) {
      return CourseService.getCourses(offset, limit)
    }
  },
  Mutation: {
    async createCourse (_, { seller, name, price, description }) {
      try {
        const a = await CourseService.createCourse(seller, name, price, description)
        return a
      } catch (err) {
        return null
      }
    }
  }
}
