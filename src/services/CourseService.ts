import { Course } from '../entity/Course'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import UserService from './UserService'
import { FileUpload } from 'graphql-upload'
import MediaService from './MediaService'
import { Media } from '../entity/Media'
import { CourseModule } from '../entity/CourseModules'
class CourseService {
  public async getCourses (offset: number, limit: number): Promise<Course[]> {
    return getRepository(Course).createQueryBuilder('course')
      .offset(offset)
      .limit(limit)
      .leftJoinAndSelect('course.seller', 'seller')
      .leftJoinAndSelect('course.modules', 'modules')
      .leftJoinAndSelect('course.thumbnail', 'thumbnail')
      .getMany()
  }

  public async getCourse (id: number) {
    return this.findById(id)
  }

  public async findById (id: number): Promise<Course> {
    return getRepository(Course).createQueryBuilder('course')
      .leftJoinAndSelect('course.seller', 'seller')
      .where('course.id = :id', { id })
      .getOne()
  }

  public async createCourse (sellerId: number, name: string, price: number, description: string = '', thumbnail: FileUpload) {
    const media = <Media> await MediaService.store(thumbnail)
    console.log(media)
    const seller = await UserService.findById(sellerId)
    const newCourse = getRepository(Course).create()
    console.log(newCourse)
    Object.assign(newCourse, {
      name,
      price,
      seller,
      description,
      thumbnail: media
    })
    console.log(newCourse)

    const course = await getRepository(Course).save(newCourse)
    return course
  }
}

export default new CourseService()
