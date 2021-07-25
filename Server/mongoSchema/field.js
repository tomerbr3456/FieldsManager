import mongoose from 'mongoose';
export const Schema = mongoose.Schema

const fieldSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  }
})

export const Field = mongoose.model('Field', fieldSchema)