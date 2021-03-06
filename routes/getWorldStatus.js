import { Router } from 'express'
import { config } from 'dotenv'
import { WorldStatus } from '../models/WorldStatus.js'
import { Vortex } from '../models/Vortex'

config()
const router = Router()

router.get('/', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        // Find World Status
        const worldStatus = await WorldStatus.findOne({}, { __v: 0 })

        // Get all Vortexes
        const vortexes = await Vortex.find({}, { __v: 0, _id: 0 })

        res.status(200).json({
          worldStatus: worldStatus,
          vortexes,
        })
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
