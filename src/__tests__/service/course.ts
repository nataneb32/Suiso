import CourseService from '../../services/CourseService'
import { Course } from '../../entity/Course'
const typeorm = require('typeorm')
describe('Course Service', () => {
  describe('getUsers', () => {
    it('should return users', async () => {
      const mock = {
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue('0x0')
      }
      typeorm.createQueryBuilder = jest.fn().mockReturnValue(mock)

      const courses = await CourseService.getCourses()
      expect(courses).toBe('0x0')
      expect(mock.from).toHaveBeenCalledWith(Course, 'course')
      expect(mock.select).toHaveBeenCalledWith('course')
    })
  })
})
