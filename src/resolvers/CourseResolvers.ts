import CourseService from '../services/CourseService'
import { createCourseObject } from '../interface/CourseInterface'
export default {
  Query: {
    async courses (_, { limit, offset }) {
      return CourseService.getCourses(offset, limit)
    }
  },
  Mutation: {
    async createCourse (_, { userId, name, price, description, thumbnail }) {
      const course = createCourseObject({ name, thumbnail, sellerId: userId, price, description })
      const a = await CourseService.createCourse(course)
      return a
    }
  }
}
