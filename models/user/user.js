import mongoose from 'mongoose';
let Schema = mongoose.Schema
let userSchema = new Schema({
  mail: { unique: true, type: String, required: true },
  username: { unique: true, type: String, required: true },
  password: { type: String, default: '' },
  name: { type: String, default: '爱泡温泉的小雪人'},
  headPortrait: { type: String, default: '../../public/default.jpg' },
  ordersCount: { type: Number, default: 0 },
  orders: [
    {
      orderId: { type: String, require: true }, 
      name: { type: String, required: true },
      imgUrl: { type: String, required: true },
      count: { type: Number, required: true },
      totalValue: { type: Number, required: true },
      status: { type: Number, require: true, default: 0}
    }
  ]
})



let userModel = mongoose.model('User', userSchema);
export default userModel