import { Router } from 'express'
import { config } from 'dotenv'
import { WorldStatus } from '../models/WorldStatus.js'

config()
const router = Router()

router.post('/', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY
      const VORTEX = process.env.VORTEX

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        if ((headers['action'] = VORTEX)) {
        } else {
          throw 'Action invalid! Please verify the action in the header.'
        }
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
