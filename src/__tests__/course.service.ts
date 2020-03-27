import CourseService from '../services/CourseService'
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
        limit: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        createQueryBuilder: jest.fn().mockReturnThis()
      }
      typeorm.getRepository = jest.fn().mockReturnValue(mock)

      const courses = await CourseService.getCourses(1, 1)
      expect(courses).toBe('0x0')
    })
  })

  describe('findById', () => {
    it('should return a course', () => {

    })
  })
})
