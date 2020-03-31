import mongoose from 'mongoose'
let citySchema = new mongoose.Schema({
  provice: {
    type: String,
  },
  proviceCode: {
    type: String
  },
  city: [
    {
      adcode: {
        type: String,
        unique: false
      },
      name: {
        type: String,
        unique: false
      }
    }
  ]
})
let cityModel = mongoose.model('citys', citySchema)
export default cityModel