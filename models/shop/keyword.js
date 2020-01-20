import mongoose from 'mongoose'
let Schema = mongoose.Schema;
let keySchema = new Schema({
  shopId: String,
  keywords: {
    type: Array
  }
})
let keywordModel = mongoose.model('keywords', keySchema);
export default keywordModel