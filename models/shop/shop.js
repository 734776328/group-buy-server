import mongoose from 'mongoose'
let Schema = mongoose.Schema
let shopSchema = Schema({
  shopId: { unique: true, type: String, required: true },
  userMail: { unique: true, type: String, required: true, },
  shopName: { unique: true, type: String, required: true },
  adder: { type: String, required: true },
  imgUrl: [
    { type: String, required: true },
  ],
  describe: { type: String, default: '超级好玩'},
  consumptionPerPerson: { type: Number, required: true }
})
let ShopModel = mongoose.model('Shop', shopSchema);

export default ShopModel