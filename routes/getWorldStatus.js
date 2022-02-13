import { Router } from 'express'
import { config } from 'dotenv'
import { WorldStatus } from '../models/worldStatus.js'
import { incrementPlayerCount } from '../modules/index.js'

config()
const router = Router()

router.get('/', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        const worldStatus = await WorldStatus.find({}, { __v: 0 })

        const { _id: id } = worldStatus[0]

        console.log('THIS IS THE ID', id)

        const newWordStatus = incrementPlayerCount(worldStatus[0])

        console.log('NEW WORDL STATUS', newWordStatus)

        const updatedWorldStatus = await WorldStatus.updateOne(
          { _id: id },
          newWordStatus
        )

        res
          .status(200)
          .json({ worldStatus: worldStatus[0], updatedWorldStatus })
      } else {
        throw 'Credentials are no valid! Please verify the header authentication.'
      }
    } else {
      throw 'Not alowed, application must be a running version of the game.'
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

export default router
