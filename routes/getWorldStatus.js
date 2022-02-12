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

    const worldStatus = await WorldStatus.find({}, { __v: 0, _id: 0 })

    res.status(200).json({ worldStatus })
    // res.json({message: 'OK'})
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
  // res.json(headers)
})

export default router
