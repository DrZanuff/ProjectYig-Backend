import { Router } from 'express'
import { config } from 'dotenv'
import { WorldStatus } from '../models/WorldStatus.js'
import { MultiverseMetric } from '../models/MultiVerseMetric'
import {
  incrementPlayerCount,
  incrementTotalPlayerCount,
} from '../modules/index.js'

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
        const { _id: worldStatusId } = worldStatus

        const newWordStatus = incrementPlayerCount(worldStatus)

        // Find Metrics
        const multiverseMetric = await MultiverseMetric.findOne({}, { __v: 0 })
        const { _id: multiverseMetricId } = multiverseMetric

        const newMultiverseMetric = incrementTotalPlayerCount(multiverseMetric)

        // Update all values
        const updatedMultiverseMetric = await MultiverseMetric.updateOne(
          { _id: multiverseMetricId },
          newMultiverseMetric
        )

        const updatedWorldStatus = await WorldStatus.updateOne(
          { _id: worldStatusId },
          newWordStatus
        )

        res.status(200).json({
          worldStatus: worldStatus,
          updatedWorldStatus,
          updatedMultiverseMetric,
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
