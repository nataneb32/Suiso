import { Course } from '../entity/Course'
import { createQueryBuilder, getRepository } from 'typeorm'
import { User } from '../entity/User'
import UserService from './UserService'
class CourseService {
  public async getCourses (): Promise<Course[]> {
    return createQueryBuilder()
      .select('course')
      .from(Course, 'course')
      .getMany()
  }

  public async findById (id: number): Promise<Course> {
    return createQueryBuilder()
      .select('course')
      .from(Course, 'course')
      .where('course.id = :id', { id })
      .getOne()
  }

  public async findByIdAndSeller (id: number, seller: User): Promise<Course> {
    return createQueryBuilder()
      .select('course')
      .from(Course, 'course')
      .where('course.id = :id', { id })
      .getOne()
  }

  public async createCourse (sellerId: number, name: string, price: number) {
    const seller = await UserService.findById(sellerId)
    const newCourse = new User()

    Object.assign(newCourse, {
      name,
      price,
      seller
    })

    return getRepository(Course).save(newCourse)
  }
}

export default new CourseService()
