import mongoose from 'mongoose'
let Shema = mongoose.Shema;
let adminSchema = new Schema({
  mail: { unique: true, type: String, required: true},
  password: { type: String, default: '' },
  headPortrait: { type: String, default: '../../public/default.jpg' },
  goodsCount: { type: String, default: 0 },
  shopId: { type: String},
})
let adminModel = mongoose.model('Admin', adminSchema);
export default adminModel