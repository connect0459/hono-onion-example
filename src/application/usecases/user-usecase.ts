import { User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user-repository'
import { IUserUseCase } from '../interfaces/user-usecase-interface'

export class UserUseCase implements IUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: { id: string; name: string; email: string }): Promise<User> {
    const user = new User(userData.id, userData.name, userData.email)
    return await this.userRepository.save(user)
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async updateUser(id: string, userData: Partial<{ name: string; email: string }>): Promise<User | null> {
    return await this.userRepository.update(id, userData)
  }

  async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id)
  }
}