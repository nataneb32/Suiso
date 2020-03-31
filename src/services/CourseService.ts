import { Course } from '../entity/Course'
import { getRepository } from 'typeorm'
import UserService from './UserService'
import MediaService from './MediaService'
import { ICourse } from '../interface/CourseInterface'
import { Media } from '../entity/Media'

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
      .leftJoinAndSelect('course.thumbnail', 'thumbnail')
      .where('course.id = :id', { id })
      .getOne()
  }

  public async createCourse (userObject: ICourse) {
    const thumbnail = await MediaService.store(userObject.thumbnail)
    const seller = await UserService.findById(userObject.sellerId)
    const newCourse = getRepository(Course).create()

    Object.assign(newCourse, {
      name: userObject.name,
      price: userObject.price,
      seller,
      description: userObject.description,
      thumbnail
    })

    const course = await getRepository(Course).save(newCourse)
    return course
  }
}

export default new CourseService()
