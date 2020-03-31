import mongoose from 'mongoose'
let proviceSchema = new mongoose.Schema({
  provices: [
    {
      provice: {
        type: String
      },
      proviceCode: {
        type: String
      }
    }
  ]
})
let provicesModel = mongoose.model('provices', proviceSchema)
export default provicesModel