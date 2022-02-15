import express from 'express'
import getWorldStatus from './routes/getWorldStatus.js'
import createMultiverse from './routes/createMultiverse.js'
import updateVortex from './routes/updateVortex.js'
import damageBoss from './routes/damageBoss'
import mongoose from 'mongoose'

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use('/getWorldStatus', getWorldStatus)
app.use('/createMultiverse', createMultiverse)
app.use('/updateVortex', updateVortex)
app.use('/damageBoss', damageBoss)

const port = process.env.PORT || 4001

const DB_USER = process.env.USER
const DB_PASSWORD = process.env.PASSWORD

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusteryig.2l0k4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database is ready...')
    app.listen(port, () => console.log(`Server is running in port ${port}`))
  })
  .catch((error) => console.log(error))
