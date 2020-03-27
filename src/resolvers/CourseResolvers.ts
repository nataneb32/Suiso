import CourseService from '../services/CourseService'
import { FileUpload } from 'graphql-upload'
import StorageProvider from '../storage'
export default {
  Query: {
    async courses (_, { limit, offset }) {
      return CourseService.getCourses(offset, limit)
    }
  },
  Mutation: {
    async createCourse (_, { seller, name, price, description, thumbnail }) {
      try {
        const a = await CourseService.createCourse(seller, name, price, description, thumbnail)
        return a
      } catch (err) {
        console.error(err)
        return null
      }
    },
    async newFile (_, { file }) {
      const { filename, mimetype, createReadStream } = await <FileUpload>file
      const readStream = createReadStream()

      return true
    }
  }
}
