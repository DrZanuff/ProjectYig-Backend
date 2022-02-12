import express from 'express'
import getWorldStatus from './routes/getWorldStatus.js'
import mongoose from 'mongoose'

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

app.use('/getWorldStatus', getWorldStatus)

const port = process.env.PORT || 4001

const DB_USER = process.env.USER
const DB_PASSWORD = process.env.PASSWORD

console.log(DB_USER, DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusteryig.2l0k4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database is ready...')
    app.listen(port, () => console.log(`Server is running in port ${port}`))
  })
  .catch((error) => console.log(error))
