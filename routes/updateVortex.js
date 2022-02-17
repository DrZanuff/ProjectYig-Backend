import { Router } from 'express'
import { config } from 'dotenv'
import { Vortex } from '../models/Vortex'
import { WorldStatus } from '../models/WorldStatus'

config()
const router = Router()

router.post('/:id', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY
      const VORTEX = process.env.VORTEX

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        if ((headers['action'] = VORTEX)) {
          const id = Number(req.params.id)

          if (isNaN(id) || id < 0) throw 'Invalid Vortex ID!'

          let newVortex = {}

          const worldStatus = await WorldStatus.findOne({})
          const vortex = await Vortex.findOne({ id: id })
          if (vortex) {
            // Update Vortex
            if (vortex.active == true) throw 'This vortex is activated.'

            const amount = req.body.amount
            if (!amount) throw 'Invalid Vortex Data, no ammout!'
            if (isNaN(req.body.amount)) throw 'Invalid ammout data.'

            if (vortex.currentValue + amount >= vortex.targetValue) {
              newVortex = {
                active: true,
                currentValue: vortex.currentValue + amount,
              }
            } else {
              newVortex = {
                currentValue: vortex.currentValue + amount,
              }
            }

            await Vortex.updateOne({ id: id }, newVortex)

            res.status(201).json({ message: 'Vortex updated...' })
          } else {
            // Create Vortex
            if (!req.body.type) throw 'Invalid Vortex Data, no type!'
            if (req.body.type != 'ammo' && req.body.type != 'health')
              throw 'Invalid type'

            newVortex = {
              id,
              type: req.body.type,
              active: false,
              targetValue: Math.floor(worldStatus.difficultyBalance * 10),
              currentValue: 0,
            }

            await Vortex.create(newVortex)

            res.status(200).json({ message: 'Vortex created', newVortex })
          }
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

export default router
