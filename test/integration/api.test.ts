import { describe, it, expect, beforeEach } from 'vitest'
import { Hono } from 'hono'
import { UserController } from '../../src/presentation/controllers/user-controller'
import { UserUseCase } from '../../src/application/usecases/user-usecase'
import { InMemoryUserRepository } from '../../src/infrastructure/repositories/in-memory-user-repository'

describe('User API Integration', () => {
  let app: Hono

  beforeEach(() => {
    const userRepository = new InMemoryUserRepository()
    const userUseCase = new UserUseCase(userRepository)
    const userController = new UserController(userUseCase)

    app = new Hono()
    app.post('/users', (c) => userController.createUser(c))
    app.get('/users/:id', (c) => userController.getUserById(c))
    app.get('/users', (c) => userController.getAllUsers(c))
    app.put('/users/:id', (c) => userController.updateUser(c))
    app.delete('/users/:id', (c) => userController.deleteUser(c))
  })

  it('should create a user via POST /users', async () => {
    const userData = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    const req = new Request('http://localhost/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' }
    })
    
    const res = await app.fetch(req)
    const body = await res.json()
    
    expect(res.status).toBe(201)
    expect(body).toEqual(userData)
  })

  it('should get user by id via GET /users/:id', async () => {
    const userData = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    await app.fetch(new Request('http://localhost/users', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' }
    }))
    
    const res = await app.fetch(new Request('http://localhost/users/1'))
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toEqual(userData)
  })

  it('should return 404 for non-existent user', async () => {
    const res = await app.fetch(new Request('http://localhost/users/999'))
    const body = await res.json()
    
    expect(res.status).toBe(404)
    expect(body).toEqual({ error: 'User not found' })
  })
})