import CourseService from '../services/CourseService'
import { createConnection, getRepository, getConnection } from 'typeorm'
import { Course } from '../entity/Course'
import { User } from '../entity/User'
import { CourseModule } from '../entity/CourseModules'
import { Media } from '../entity/Media'
import { Video } from '../entity/Video'
import { FileUpload } from 'graphql-upload'
import { createReadStream } from 'fs'
import { join } from 'path'

describe('Course Service', () => {
  beforeEach(async () => {
    try {
      await getConnection().close() // Yep. it is a hack :)
    } catch {

    }
    return createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [Course, User, CourseModule, Media, Video],
      synchronize: true,
      logging: false
    })
  })
  describe('getUsers', () => {
    it('should return one course', async () => {
      await getRepository(User).save(<User>{ username: 'admin', password: 'password' })

      const course = await CourseService.createCourse(1, 'asd', 12.32, 'desc', <FileUpload>{ createReadStream: () => createReadStream(join(__dirname, './file.jpg')), filename: 'file.jpg' })
      expect(await getRepository(Course).findOne(course.id)).toEqual(expect.objectContaining({ id: 1, name: 'asd', price: 12.32 }))
    })
    it('should return one course should have right media', async () => {
      await getRepository(User).save(<User>{ username: 'admin', password: 'password' })

      const course = await CourseService.createCourse(1, 'asd', 12.32, 'desc', <FileUpload>{ createReadStream: () => createReadStream(join(__dirname, './file.jpg')), filename: 'file.jpg' })
      expect(getRepository(Course).findOne({ where: { id: course.id }, relations: ['modules', 'thumbnail'] })).resolves.toEqual(expect.objectContaining({
        thumbnail: expect.objectContaining({
          id: 1,
          name: course.thumbnail.name
        })
      }))
    })
  })
})
