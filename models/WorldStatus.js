import mongoose from 'mongoose'
const { model, Schema } = mongoose

const schema = new Schema({
  targetPlayers: { type: Number, required: true },
  currentPlayers: { type: Number, required: true },
  currentBlock: { type: Number, required: true },
  blockActivation: { type: Date, required: true },
  difficultyBalance: { type: Number, required: true },

  bossLife: { type: Number, required: true },
  bossTotalLife: { type: Number, required: true },

  heroName: { type: String, required: true },
  heroMessage: { type: String, required: true },

  gameMutations: {
    enemiesDamageBonus: { type: Number, required: true },
    playersDamageMult: { type: Number, required: true },
    playersMaxLife: { type: Number, required: true },
  },
})

export const WorldStatus = model('WorldStatus', schema)
