import mongoose from 'mongoose'
let hotSearchSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  heat: {
    type: Number,
    default: 0
  }
})
let hotSearch = mongoose.model('hotsearch', hotSearchSchema);
export default hotSearch