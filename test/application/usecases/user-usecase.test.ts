import { describe, it, expect, vi, beforeEach } from 'vitest'
import { UserUseCase } from '../../../src/application/usecases/user-usecase'
import { UserRepository } from '../../../src/domain/repositories/user-repository'
import { User } from '../../../src/domain/entities/user'

describe('UserUseCase', () => {
  let userUseCase: UserUseCase
  let mockRepository: UserRepository

  beforeEach(() => {
    mockRepository = {
      save: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
    userUseCase = new UserUseCase(mockRepository)
  })

  it('should create a user', async () => {
    const userData = { id: '1', name: 'John Doe', email: 'john@example.com' }
    const user = new User(userData.id, userData.name, userData.email)
    vi.mocked(mockRepository.save).mockResolvedValue(user)

    const result = await userUseCase.createUser(userData)

    expect(mockRepository.save).toHaveBeenCalledWith(expect.any(User))
    expect(result).toEqual(user)
  })

  it('should get user by id', async () => {
    const user = new User('1', 'John Doe', 'john@example.com')
    vi.mocked(mockRepository.findById).mockResolvedValue(user)

    const result = await userUseCase.getUserById('1')

    expect(mockRepository.findById).toHaveBeenCalledWith('1')
    expect(result).toEqual(user)
  })

  it('should get all users', async () => {
    const users = [new User('1', 'John Doe', 'john@example.com')]
    vi.mocked(mockRepository.findAll).mockResolvedValue(users)

    const result = await userUseCase.getAllUsers()

    expect(mockRepository.findAll).toHaveBeenCalled()
    expect(result).toEqual(users)
  })
})