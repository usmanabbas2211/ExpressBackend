import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import { initiatRoutes } from './routes/mainRouter'
import cors from 'cors'
/*eslint-disable */
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

initiatRoutes(app)

mongoose
    .connect(process.env.MONGO_QUERY_STRING)
    .then(() => console.log('connected to mongoDB'.white.bgBlue))
    .catch((err) => console.log(err))

app.listen(process.env.PORT, () =>
    console.log(`server is listening on port ${process.env.PORT}`.bgCyan)
)
