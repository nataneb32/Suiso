import { Course } from '../entity/Course'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import UserService from './UserService'
class CourseService {
  public async getCourses (offset: number, limit: number): Promise<Course[]> {
    return getRepository(Course).createQueryBuilder('course')
      .offset(offset)
      .limit(limit)
      .leftJoinAndSelect('course.seller', 'seller')
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

  public async createCourse (sellerId: number, name: string, price: number, description: string = '') {
    const seller = await UserService.findById(sellerId)
    const newCourse = new User()

    Object.assign(newCourse, {
      name,
      price,
      seller,
      description
    })

    const course = await getRepository(Course).save(newCourse)
    return this.findById(course.id)
  }
}

export default new CourseService()
