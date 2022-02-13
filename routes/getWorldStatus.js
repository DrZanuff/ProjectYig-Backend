import { Router } from 'express'
// import { Response , Request, Router } from '@types/express'
// const Router = require('express')
// const config = require('dotenv')
import { differenceInDays } from 'date-fns'
import { config } from 'dotenv'
import { WorldStatus } from '../models/worldStatus.js'

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
        //const id = JSON.stringify(_id)

        console.log('THIS IS THE ID', id)

        let currentPlayers = worldStatus[0].currentPlayers + 1

        let newWordStatus = {}

        if (currentPlayers >= worldStatus[0].targetPlayers) {
          currentPlayers = 0
          let targetPlayers = worldStatus[0].targetPlayers

          const currentBlock = worldStatus[0].currentBlock + 1
          const lastBlockActivation = worldStatus[0].blockActivation

          const currentDate = new Date()
          const blockActivation = currentDate

          const daysInterval = Math.max(
            differenceInDays(currentDate, lastBlockActivation),
            1
          )

          console.log(
            'CURRENT DATE',
            currentDate,
            'LAST BLOCK DATE',
            lastBlockActivation
          )
          console.log('DAYS INTERVALS', daysInterval)
          const difficultyBalance = targetPlayers / daysInterval
          targetPlayers = Math.floor(targetPlayers / daysInterval) * 10

          newWordStatus = {
            targetPlayers,
            currentPlayers,
            currentBlock,
            blockActivation,
            difficultyBalance,
          }
        } else {
          newWordStatus = {
            currentPlayers,
          }
        }

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
