import CourseService from '../services/CourseService'
import { createCourseObject } from '../interface/CourseInterface'
import { FileUpload } from 'graphql-upload'
export default {
  Query: {
    async courses (_, { limit, offset }) {
      return CourseService.getCourses(offset, limit)
    }
  },
  Mutation: {
    async createCourse (_, { userId, name, price, description, thumbnail }) {
      const course = await createCourseObject({ name, thumbnail: <Promise<FileUpload>>thumbnail, sellerId: userId, price, description })
      return CourseService.createCourse(course)
    }
  }
}
