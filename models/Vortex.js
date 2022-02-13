import mongoose from 'mongoose'
const { model, Schema } = mongoose

const schema = new Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  active: { type: Boolean, required: true },
  targetValue: { type: Number, required: true },
  currentValue: { type: Number, required: true },
})

export const Vortex = model('Vortex', schema)
