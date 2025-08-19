import { describe, it, expect } from 'vitest'
import { IUserUseCase } from '../../../src/application/interfaces/user-usecase-interface'
import { User } from '../../../src/domain/entities/user'

describe('IUserUseCase Interface', () => {
  it('should define correct method signatures', () => {
    const mockUseCase: IUserUseCase = {
      createUser: async (userData: { id: string; name: string; email: string }): Promise<User> => {
        return new User(userData.id, userData.name, userData.email)
      },
      getUserById: async (id: string): Promise<User | null> => null,
      getAllUsers: async (): Promise<User[]> => [],
      updateUser: async (id: string, userData: Partial<{ name: string; email: string }>): Promise<User | null> => null,
      deleteUser: async (id: string): Promise<boolean> => false
    }

    expect(typeof mockUseCase.createUser).toBe('function')
    expect(typeof mockUseCase.getUserById).toBe('function')
    expect(typeof mockUseCase.getAllUsers).toBe('function')
    expect(typeof mockUseCase.updateUser).toBe('function')
    expect(typeof mockUseCase.deleteUser).toBe('function')
  })
})