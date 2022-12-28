import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { authenticate } from './middlewares/auth'
import userRoutes from './routes/userRoutes'
import taskRoutes from './routes/taskRoutes'
import cors from 'cors'
import * as colors from 'colors'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())
app.use(
    cors({
        origin: '*',
    })
)
app.use(morgan('combined'))
app.get('/api/hello', (req, res) => {
    res.send('Hello World get!')
})
app.post('/api/hello', (req, res) => {
    res.send('Hello World post!')
})
app.use('/api', userRoutes)
app.use('/api/tasks', authenticate, taskRoutes)

mongoose
    .connect(process.env.MONGO_QUERY_STRING)
    .then(() => console.log('connected to mongoDB'.white.bgBlue))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () =>
    console.log(`server is listening on port ${process.env.PORT}`.bgCyan)
)
