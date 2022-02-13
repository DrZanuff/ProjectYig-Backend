import mongoose from 'mongoose'
const { model, Schema } = mongoose

const EonSchema = new Schema({
  eonId: { type: Number, required: true },
  eonStartDate: { type: Date, required: true },
  eonEndDate: { type: Date, required: false },
  totalPlayers: { type: Number, required: true },
  heroName: { type: String, required: true },
  heroMessage: { type: String, required: true },
})

const MultiverseMetricSchema = new Schema({
  totalPlayers: { type: Number, required: true },
  currentEon: { type: Number, required: true },
  totalPlayersCurrentEon: { type: Number, required: true },
  eons: [EonSchema],
})

export const MultiverseMetric = model(
  'MultiverseMetric',
  MultiverseMetricSchema
)
