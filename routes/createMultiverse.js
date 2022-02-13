import { Router } from 'express'
import { config } from 'dotenv'
import { MultiverseMetric } from '../models/MultiVerseMetric'
import { isValid } from 'date-fns'

config()
const router = Router()

router.post('/', async (req, res) => {
  try {
    const headers = req.headers

    if (headers['user-agent'] == 'godot') {
      const AUTH = process.env.AUTH
      const KEY = process.env.KEY
      const CREATE = process.env.CREATE

      if (headers['auth-token'] == AUTH && headers['user-key'] == KEY) {
        if ((headers['action'] = CREATE)) {
          const multiverse = await MultiverseMetric.findOne({}, {})

          console.log('REPONSE', multiverse)

          if (!multiverse) {
            console.log('There is no Multiverse, creating one')
            const dateString = req.body.date
            const dateObject = new Date(dateString)

            if (dateString && isValid(dateObject)) {
              console.log('DATE', dateString, 'DATE OBJ', dateObject)

              await MultiverseMetric.create({
                totalPlayers: 0,
                currentEon: 0,
                totalPlayersCurrentEon: 0,

                eons: [
                  {
                    eonId: 0,
                    eonStartDate: dateObject,
                    eonEndDate: '',
                    totalPlayers: 0,
                    heroName: 'The First One',
                    heroMessage:
                      'Yig awakens, yet again, in another Universe, in another Eon. You must fulfill your destiny and try to save the Multiverse..., as you did before, as you will again, in the infinitive of the existence.',
                  },
                ],
              })
            } else {
              throw 'You must pass a valid date to the parameter "date" in the payload'
            }
          } else {
            throw 'There is already a Multiverse created. Erase the current one if you want to create a new one'
          }

          res.status(200).json({ message: 'Multiverse Created' })
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
