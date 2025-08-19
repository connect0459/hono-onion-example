import { Hono } from 'hono'
import { Registry } from '../../registry'

export function setupRoutes(app: Hono) {
  const userController = Registry.userController

  app.get('/', (c) => {
    return c.text('Hello Hono!')
  })

  // User routes
  app.post('/users', (c) => userController.createUser(c))
  app.get('/users/:id', (c) => userController.getUserById(c))
  app.get('/users', (c) => userController.getAllUsers(c))
  app.put('/users/:id', (c) => userController.updateUser(c))
  app.delete('/users/:id', (c) => userController.deleteUser(c))
}