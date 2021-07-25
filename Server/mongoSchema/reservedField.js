import mongoose from 'mongoose';
export const Schema = mongoose.Schema

const reservedFieldSchema = new Schema({
  reservedBy: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  fieldId: {
    type: String,
    required: true
  },
})

export const ReservedField = mongoose.model('ReservedField', reservedFieldSchema)