import { describe, it, expect } from 'vitest'
import { UserRepository } from '../../../src/domain/repositories/user-repository'
import { User } from '../../../src/domain/entities/user'

describe('UserRepository Interface', () => {
  it('should define correct method signatures', () => {
    const mockRepository: UserRepository = {
      save: async (user: User): Promise<User> => user,
      findById: async (id: string): Promise<User | null> => null,
      findAll: async (): Promise<User[]> => [],
      update: async (id: string, user: Partial<User>): Promise<User | null> => null,
      delete: async (id: string): Promise<boolean> => false
    }

    expect(typeof mockRepository.save).toBe('function')
    expect(typeof mockRepository.findById).toBe('function')
    expect(typeof mockRepository.findAll).toBe('function')
    expect(typeof mockRepository.update).toBe('function')
    expect(typeof mockRepository.delete).toBe('function')
  })
})