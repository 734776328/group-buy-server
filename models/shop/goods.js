import mongoose from 'mongoose'
let Schema = mongoose.Schema;
let goodsSchema = new Schema({
  mail: { type: String},
  shopId: { type: String, required: true },
  goods: {
    goodsId: { unique: true, type: String },
    originPrice: { type: String, default: 0 },
    preferentialPrice: { type: String, default: 0 },
    name: {type: String, default: '山有木兮' },
    consumeSum: { type: Number, default: 0 },
    backTime: { type: Number, default: 1 },
    overdueBack: { type: Number, default: 1 },
    slideImg: { type: Array, required: true},
    imgText: { type: String, default: '请参考下图' },
    goodsDescribe: { type: String, default: '程序员客栈，欢迎入住！'},
    imgDescribe: [
      { type: String, require: true}
    ],
    periodValidity: {type: Number, default: 60 },
    useDate: { type: String, default: '9-18' },
    appointmentTime: { type: Number, default: 0 },
    usePeople: { type: Number, default: 1 },
    evaluateCount: { type: Number, default: 0 },
    evaluate: [
      {
        username: { type: String },
        context: { type: String },
        imgs: [
          { type: String }
        ],
        date: { type: Date, default: Date.now() }
      }
    ]
  }
})
let goodsModel = mongoose.model('Goods', goodsSchema)
export default goodsModel