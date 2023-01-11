import userRoutes from './userRoutes'
import taskRoutes from './taskRoutes'
import { authenticate } from '../middlewares/auth'

export const initiatRoutes = (app) => {
    app.use('/api/v1', userRoutes)
    app.use('/api/tasks', authenticate, taskRoutes)
}
