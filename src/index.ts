import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { UserController } from './presentation/controllers/user-controller'
import { UserUseCase } from './application/usecases/user-usecase'
import { InMemoryUserRepository } from './infrastructure/repositories/in-memory-user-repository'
import { UserRepository } from './domain/repositories/user-repository'
import { IUserUseCase } from './application/interfaces/user-usecase-interface'
import { IUserController } from './presentation/interfaces/user-controller-interface'

const userRepository: UserRepository = new InMemoryUserRepository()
const userUseCase: IUserUseCase = new UserUseCase(userRepository)
const userController: IUserController = new UserController(userUseCase)

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/users', (c) => userController.createUser(c))
app.get('/users/:id', (c) => userController.getUserById(c))
app.get('/users', (c) => userController.getAllUsers(c))
app.put('/users/:id', (c) => userController.updateUser(c))
app.delete('/users/:id', (c) => userController.deleteUser(c))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
