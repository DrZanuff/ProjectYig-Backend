import { Router } from 'express'
import { config } from 'dotenv'
import { WorldStatus } from '../models/WorldStatus'
import { Vortex } from '../models/Vortex'
import { MultiverseMetric } from '../models/MultiVerseMetric'

config()
const router = Router()

router.patch('/', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY
      const BOSS = process.env.BOSS

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        if ((headers['action'] = BOSS)) {
          const damage = req.body.damage
          if (isNaN(damage)) throw 'You must pass a valid damage number.'

          const worldStatus = await WorldStatus.findOne({}, { __v: 0 })

          const id = worldStatus['_id']
          const newBossLife = worldStatus.bossLife - damage

          if (newBossLife > 0) {
            await WorldStatus.findOneAndUpdate(
              { _id: id },
              { bossLife: newBossLife },
              { new: true }
            )

            res.status(200).json({
              message: 'Applied damage to the Boss!',
              damage,
              bossLife: newBossLife,
            })
          } else {
            await Vortex.deleteMany({})

            const defaultHeroName = 'The First One'
            const defaultHeroMessage =
              'Yig awakens, yet again, in another Universe, in another Eon. You must fulfill your destiny and try to save the Multiverse..., as you did before, as you will again, in the infinitive of the existence.'

            const newWorld = {
              targetPlayers: 10,
              currentPlayers: 0,
              currentBlock: 0,
              blockActivation: new Date(),
              difficultyBalance: 1.0,

              bossLife: 3000.0,

              heroName: req.body.name ? req.body.name : defaultHeroName,
              heroMessage: req.body.message
                ? req.body.message
                : defaultHeroMessage,

              gameMutations: {
                enemiesDamageBonus: 0,
                playersDamageMult: 1,
                playersMaxLife: 3,
              },
            }

            await WorldStatus.findOneAndUpdate({}, newWorld)

            const multiverseMetric = await MultiverseMetric.findOne(
              {},
              { __v: 0 }
            )

            const eonsSize = multiverseMetric.eons.length
            const newMultiverseMetric = {
              totalPlayers: multiverseMetric.totalPlayers,
              currentEon: multiverseMetric.currentEon + 1,
              totalPlayersCurrentEon: 0,
              eons: [
                ...multiverseMetric.eons,
                {
                  eonId: eonsSize,
                  eonStartDate:
                    multiverseMetric.eons[eonsSize - 1].eonStartDate,
                  eonEndDate: new Date(),
                  totalPlayers: multiverseMetric.totalPlayersCurrentEon,
                  heroName: req.body.name ? req.body.name : defaultHeroName,
                  heroMessage: req.body.message
                    ? req.body.message
                    : defaultHeroMessage,
                },
              ],
            }

            await MultiverseMetric.findOneAndUpdate({}, newMultiverseMetric)

            res
              .status(200)
              .json({ message: 'You killed the Boss! A new Eon begins...' })
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
