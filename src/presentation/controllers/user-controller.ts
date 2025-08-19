import { Context } from 'hono'
import { IUserUseCase } from '../../application/interfaces/user-usecase-interface'
import { IUserController } from '../interfaces/user-controller-interface'

export class UserController implements IUserController {
  constructor(private userUseCase: IUserUseCase) {}

  async createUser(c: Context) {
    try {
      const userData = await c.req.json()
      const user = await this.userUseCase.createUser(userData)
      return c.json(user, 201)
    } catch (error: any) {
      return c.json({ error: error.message }, 400)
    }
  }

  async getUserById(c: Context) {
    try {
      const id = c.req.param('id')
      const user = await this.userUseCase.getUserById(id)
      
      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }
      
      return c.json(user)
    } catch (error: any) {
      return c.json({ error: error.message }, 500)
    }
  }

  async getAllUsers(c: Context) {
    try {
      const users = await this.userUseCase.getAllUsers()
      return c.json(users)
    } catch (error: any) {
      return c.json({ error: error.message }, 500)
    }
  }

  async updateUser(c: Context) {
    try {
      const id = c.req.param('id')
      const userData = await c.req.json()
      const user = await this.userUseCase.updateUser(id, userData)
      
      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }
      
      return c.json(user)
    } catch (error: any) {
      return c.json({ error: error.message }, 400)
    }
  }

  async deleteUser(c: Context) {
    try {
      const id = c.req.param('id')
      const deleted = await this.userUseCase.deleteUser(id)
      
      if (!deleted) {
        return c.json({ error: 'User not found' }, 404)
      }
      
      return c.json({ message: 'User deleted successfully' })
    } catch (error: any) {
      return c.json({ error: error.message }, 500)
    }
  }
}