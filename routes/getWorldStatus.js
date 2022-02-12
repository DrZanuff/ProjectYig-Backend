import { Router } from 'express'
// import { Response , Request, Router } from '@types/express'
// const Router = require('express')
// const config = require('dotenv')
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
        const worldStatus = await WorldStatus.find({}, { __v: 0, _id: 0 })

        res.status(200).json({ worldStatus })
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
