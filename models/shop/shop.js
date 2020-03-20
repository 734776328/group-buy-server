import mongoose from 'mongoose'
let Schema = mongoose.Schema
let shopSchema = Schema({
  shopId: { unique: true, type: String, required: true },
  userMail: { unique: true, type: String, required: true, },
  shopName: { unique: true, type: String, required: true },
  adder: { type: String, required: true },
  consumptionPerPerson: { type: String, required: true},
  businessHoursBegin: { type: String, default: '19:00'},
  businessHoursClose: { type: String, default: '02:00'},
  label: [
    { type: String}
  ],
  timeRefund: { type: Boolean, default: true},
  overdueRefund: { type: Boolean, default: true},
  imgUrl: [
    { type: String, required: true },
  ],
  describe: { type: String, default: '超级好玩'},
  consumptionPerPerson: { type: Number, required: true }
})
let ShopModel = mongoose.model('Shop', shopSchema);

export default ShopModel