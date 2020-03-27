import CourseService from '../services/CourseService'
import { FileUpload } from 'graphql-upload'
import * as fs from 'fs'
import StorageProvider from '../storage'
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
    },
    async newFile (_, { file }) {
      const { filename, mimetype, createReadStream } = await <FileUpload>file
      const readStream = createReadStream()
      console.log(await StorageProvider.upload(readStream, filename))
      return true
    }
  }
}
