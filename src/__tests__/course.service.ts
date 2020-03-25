import CourseService from '../services/CourseService'
import { Course } from '../entity/Course'
const typeorm = require('typeorm')
describe('Course Service', () => {
  describe('getUsers', () => {
    it('should return courses', async () => {
      const mock = {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue('0x0'),
        relation: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis()
      }
      typeorm.createQueryBuilder = jest.fn().mockReturnValue(mock)

      const courses = await CourseService.getCourses(1, 1)
      expect(courses).toBe('0x0')
      expect(mock.from).toHaveBeenCalledWith(Course, 'course')
      expect(mock.select).toHaveBeenCalledWith('course')
      expect(mock.limit).toHaveBeenCalledWith(1)
      expect(mock.offset).toHaveBeenCalledWith(1)
    })
  })

  describe('findById', () => {
    it('should return a course', () => {

    })
  })
})
