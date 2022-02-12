import { model, Schema } from 'mongoose'

interface WorldStatusInterface {
  targetPlayers: Number // Numero de jogadores necessários para iniciar um novo bloco
  currentPlayers: Number // Quantos jogadores já jogaram neste bloco
  currentBlock: Number // Indice do Bloco atual
  blockActivation: Date // Data de inicio deste bloco
  difficultyBalance: Number // Multiplicador das váraiveis

  gameMutations: {
    enemiesDamageBonus: Number
    playersDamageMult: Number
    playersMaxLife: Number
  }
}

const schema = new Schema<WorldStatusInterface>({
  targetPlayers: { type: Number, required: true },
  currentPlayers: { type: Number, required: true },
  currentBlock: { type: Number, required: true },
  blockActivation: { type: Date, required: true },
  difficultyBalance: { type: Number, required: true },

  gameMutations: {
    enemiesDamageBonus: { type: Number, required: true },
    playersDamageMult: { type: Number, required: true },
    playersMaxLife: { type: Number, required: true },
  },
})

export const WorldStatus = model<WorldStatusInterface>('WorldStatus', schema)
