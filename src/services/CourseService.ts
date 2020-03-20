import { Course } from '../entity/Course'
import { createQueryBuilder, getRepository } from 'typeorm'
import { User } from '../entity/User'
import UserService from './UserService'
class CourseService {
  public async getCourses (): Promise<Course[]> {
    return getRepository(Course).find({ relations: ['seller'] })
  }

  public async findById (id: number): Promise<Course> {
    return getRepository(Course).findOne(id, {
      relations: ['seller']
    })
  }

  public async createCourse (sellerId: number, name: string, price: number) {
    const seller = await UserService.findById(sellerId)
    const newCourse = new User()

    Object.assign(newCourse, {
      name,
      price,
      seller
    })

    const course = await getRepository(Course).save(newCourse)
    return this.findById(course.id)
  }
}

export default new CourseService()
