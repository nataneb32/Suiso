import { Course } from '../entity/Course'
import { createQueryBuilder } from 'typeorm'
import { User } from '../entity/User'
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

  public async createCourse () {

  }
}

export default new CourseService()
