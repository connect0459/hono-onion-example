import { User } from '../../domain/entities/user'
import { UserRepository } from '../../domain/repositories/user-repository'

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map()

  async save(user: User): Promise<User> {
    this.users.set(user.id, user)
    return user
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values())
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const existingUser = this.users.get(id)
    if (!existingUser) {
      return null
    }

    const updatedUser = new User(
      id,
      userData.name || existingUser.name,
      userData.email || existingUser.email
    )
    
    this.users.set(id, updatedUser)
    return updatedUser
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id)
  }
}