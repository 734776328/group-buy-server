import mongoose from 'mongoose'
let Schema = mongoose.Schema
let shopSchema = Schema({
  shopId: { unique: true, type: String, required: true },
  userMail: { unique: true, type: String, required: true, },
  shopName: { unique: true, type: String, required: true },
  adder: { type: String, required: true },
  consumptionPerPerson: { type: Number, required: true},
  businessHoursBegin: { type: String, default: '19:00'},
  businessHoursClose: { type: String, default: '02:00'},
  label: [
    { type: String}
  ],
  timeRefund: { type: Boolean, default: true},
  overdueRefund: { type: Boolean, default: true},
  imgUrl: [
    { type: String, default: 'public/default.png' },
  ],
  imgNames: [
    { type: String, default: ''}
  ],
  describe: { type: String, default: '超级好玩'},
})
let ShopModel = mongoose.model('Shop', shopSchema);

export default ShopModel