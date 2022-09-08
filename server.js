const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const welcomeRoutes = require('./routes/welcomeRoutes')
require('colors')
require('dotenv').config()

const app = express()
app.use(express.json())

app.use(morgan('combined'))

app.use('/api', userRoutes)
app.use('/api/welcome', welcomeRoutes)

mongoose
	.connect(process.env.MONGO_QUERY_STRING)
	.then(() => console.log('connected to mongoDB'.white.bgBlue))
	.catch(err => console.log(err.red))

app.listen(process.env.PORT, () =>
	console.log(`server is listening on port ${process.env.PORT}`.bgCyan)
)
