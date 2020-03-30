import shopModel from '../../models/shop/shop.js'
import goodsModel from '../../models/shop/goods.js'
import userModel from '../../models/user/user.js'
import keywordModel from '../../models/shop/keyword.js'
import hotSearchModel from '../../models/shop/hotSearch.js'
import axios from 'axios'

class Shop {
  constructor () {
    this.getShops = this.getShops.bind(this)
    // this.goods = this.goods.bind(this)
    this.getShopDetaile = this.getShopDetaile.bind(this)
    this.getGoodsDetaile = this.getGoodsDetaile.bind(this)
    this.getShopInfo = this.getShopInfo.bind(this)
    this.search = this.search.bind(this)
    this.createShop = this.createShop.bind(this)
    this.addGoods = this.addGoods.bind(this)
    this.saveShopImg = this.saveShopImg.bind(this)
    this.saveGoodsImg = this.saveGoodsImg.bind(this)
    this.changeGoods = this.changeGoods.bind(this)
    this.deleteGoods = this.deleteGoods.bind(this)
  }
  // 添加商品
  async addGoods (req, res, next) {
    const { goodsData } = req.body
    var goodsInfo = JSON.parse(goodsData).goods
    const {username} = req.session.userInfo.username
    const goodsId = this.randomId()
    goodsInfo.imgNames.forEach((item, index) => {
      if (!item) return
      if (index < 3 ) {
        if (item.indexOf('public') === -1) {
          goodsInfo.slideImg[index] = `public/${req.session.userInfo.username}-${goodsId}-${item}`
        }
      } else if (index >= 3) {
        if (item.indexOf('public') === -1) {
          goodsInfo.imgDescribe[index-3] = `public/${req.session.userInfo.username}-${goodsId}-${item}`
        }
      }
    })
    var insert = new goodsModel({
      mail: req.session.userInfo.mail,
      shopId: req.session.userInfo.username,
      goods: {
        goodsId,
        name: goodsInfo.name,
        goodsDescribe: goodsInfo.goodsDescribe,
        originPrice: goodsInfo.originPrice,
        preferentialPrice: goodsInfo.preferentialPrice,
        consumeSum: goodsInfo.consumeSum,
        imgNames: goodsInfo.imgNames,
        slideImg: goodsInfo.slideImg,
        imgDescribe: goodsInfo.imgDescribe,
        periodValidity: goodsInfo.periodValidity,
        appointmentTime: goodsInfo.appointmentTime,
        usePeople: goodsInfo.usePeople,
        evaluateCount: goodsInfo.evaluateCount,
        evaluate: [
          {
            username: '山有木兮',
            date: new Date().getTime(),
            context: '不错啊',
            imgs: [
              'http://p0.meituan.net/shaitu/71d4c2e633cb135b430d26e12e43f1a53532766.jpg',
              'http://p1.meituan.net/shaitu/115623c1c28193f171cfa2980bbff79b3275338.jpg',
              'http://p1.meituan.net/shaitu/92a6085db7f777ab7e271c2dfb2443b22887338.jpg',
              'http://p0.meituan.net/shaitu/18aa1a54249d337b50718a719e73b3aa2217645.jpg'
            ],
          }
        ]
      }
    })
    await insert.save( (err, resulte) => {
      if (err) {
        console.log(err)
        return false;
      }
      res.status(200).send({
        status: 200,
        data: {
          goodsId
        }
      })
    })
    
  }
  // 删除商品 
  deleteGoods (req, res, next) {
    const { goodsid } = req.params
    const { username } = req.session.userInfo
    goodsModel.deleteOne({'shopId': username, 'goods.goodsId': goodsid}, (err, docs) => {
      if (err) {
        res.send({
          status: 500,
          msg: '删除失败！',
          data: {}
        })
        return
      }
      if (docs) {
        res.send({
          status: 200,
          msg: '删除成功！',
          data: {}
        })
      }
    })
  }
  // 修改商品
  async changeGoods (req, res, next) {
    const { goodsid } = req.params
    let { goodsData } = req.body
    goodsData = JSON.parse(goodsData).goods
    goodsData.imgNames.forEach( (item, index) => {
      if (!item) return
      if (index < 3 ) {
        if (item.indexOf('public') === -1) {
          goodsData.slideImg[index] = `public/${req.session.userInfo.username}-${goodsid}-${item}`
        }
      } else if (index >= 3) {
        if (item.indexOf('public') === -1) {
          goodsData.imgDescribe[index-3] = `public/${req.session.userInfo.username}-${goodsid}-${item}`
        }
      }
    })
    let result = await goodsModel.updateOne({"goods.goodsId": goodsid}, {
      'goods.originPrice': goodsData.originPrice,
      'goods.preferentialPrice': goodsData.preferentialPrice,
      'goods.name': goodsData.name,
      'goods.consumeSum': goodsData.consumeSum,
      'goods.imgNames': goodsData.imgNames,
      'goods.slideImg': goodsData.slideImg,
      'goods.goodsDescribe': goodsData.goodsDescribe,
      'goods.imgDescribe': goodsData.imgDescribe,
      'goods.useDate': goodsData.useDate,
      'goods.appointmentTime': goodsData.appointmentTime,
      'goods.usePeople': goodsData.usePeople,
    })
    if (result) {
      res.status(200).send({
        status: 200,
        msg: '修改成功！',
        data: {}
      })
    } else {
      res.status(500).send({
        status: 500,
        msg: '无服务器繁忙,请稍后再试！',
        data: {}
      })
    }
  }
  //创建商铺 
  async createShop (req, res, next) {
    const shopData = JSON.parse(req.body.shopData)
    const { username } = req.session.userInfo
    const shops = await userModel.findOne({mail: req.session.userInfo.mail})
    console.log(shopData.imgNames)
    shopData.imgNames.forEach( (item, index) => {
      if (item && item.indexOf('public') === -1) {
        shopData.imgUrl[index] = 'public/' + shopData.imgNames[index]
      }
    })
    if (!shops.merchant) {
      let create = new shopModel({
        shopId: req.session.userInfo.username,
        businessHoursBegin: shopData.businessHoursBegin,
        businessHoursClose: shopData.businessHoursClose,
        label: shopData.label,
        timeRefund: shopData.timeRefund,
        overdueRefund: shopData.overdueRefund,
        imgUrl: shopData.imgUrl,
        describe: shopData.describe,
        businessHours: shopData.businessHours,
        shopName: shopData.shopName,
        adder: shopData.adder,
        consumptionPerPerson: shopData.consumptionPerPerson,
        keywords: shopData.keywords,
        userMail: req.session.userInfo.mail
      })
      create.save(async (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).send({
            status: 500,
            msg: '服务器繁忙,请稍后再试-N',
            data: {}
          })
          return
        } else {
          await userModel.updateOne({mail: req.session.userInfo.mail}, {merchant: true, shopId: req.session.userInfo.username})
          res.status(200).send({
            status: 200,
            msg: '创建成功',
            data: {}
          })
        }
      })
    } else {
      await shopModel.updateOne({shopId: req.session.userInfo.username}, {
        businessHoursBegin: shopData.businessHoursBegin,
        businessHoursClose: shopData.businessHoursClose,
        label: shopData.label,
        timeRefund: shopData.timeRefund,
        overdueRefund: shopData.overdueRefund,
        imgUrl: shopData.imgUrl,
        describe: shopData.describe,
        businessHours: shopData.businessHours,
        shopName: shopData.shopName,
        adder: shopData.adder,
        consumptionPerPerson: shopData.consumptionPerPerson,
        keywords: shopData.keywords
      }, async (err, result) => {
        if (err) {
          console.log(err)
          res.status(500).send({
            status: 500,
            msg: '服务器繁忙， 请稍后再试！',
            data: {}
          })
          return false
        }
        await userModel.updateOne({mail: req.session.userInfo.mail}, {merchant: true})
        res.status(200).send({
          status: 200,
          msg: '更新成功！',
          data: {
            businessHoursBegin: shopData.businessHoursBegin,
            businessHoursClose: shopData.businessHoursClose,
            label: shopData.label,
            timeRefund: shopData.timeRefund,
            overdueRefund: shopData.overdueRefund,
            imgUrl: shopData.imgUrl,
            describe: shopData.describe,
            businessHours: shopData.businessHours,
            shopName: shopData.shopName,
            adder: shopData.adder,
            consumptionPerPerson: shopData.consumptionPerPerson,
            keywords: shopData.keywords
          }
        })
      })
    }
  }
  
  // 处理上传的商铺图片
  saveShopImg (req, res, next) {
    res.status(200).send({
      status: 200,
      msg: '上传成功',
      data: {}
    })
  }
  // 处理上传的商品图片
  saveGoodsImg (req, res, next) {
    res.status(200).send({
      status: 200,
      msg: '上传成功',
      data: {}
    })
  }
  // 返回所有商铺
  async getShops (req, res, next) {
    let result = await shopModel.find()
    res.status(200).send({
      msg: '获取成功',
      data: result
    })
  }
  // 返回某个商铺的详情,包括商品信息
  async getShopDetaile (req, res, next) {
    const { shopid } = req.params
    let resultGoods = await goodsModel.find({shopId: shopid})
    let shopInfo = await shopModel.findOne({shopId: shopid})
    if (resultGoods.length || shopInfo) {
      res.status(200).send({
        msg: '返回所有商品',
        data: {
          shopInfo,
          goods: resultGoods
        }
      })
    } else {
      res.status(401).send({
        msg: '无此商品！',
        data: {}
      })
    }
  }
  // 获取商品详情
  async getGoodsDetaile (req, res, next) {
    const { goodsid } = req.params;
    console.log(goodsid)
    let resultGoods = await goodsModel.find({'goods.goodsId': goodsid});
    if (resultGoods.length) {
      res.status(200).send({
        msg: '获取商品！',
        data: resultGoods[0]
      })
    } else {
      res.status(401).send({
        msg: '商品不存在!',
        data: {}
      })
    }
  }
  // 返回某个商铺的基本信息
  async getShopInfo (req, res, next) {
    const { shopid } = req.params;
    let shopInfo = await shopModel.findOne({shopId: shopid});
    if (shopInfo) {
      res.status(200).send({
        msg: '获取商铺信息！',
        data: shopInfo
      })
    } else {
      res.status(401).send({
        msg: '商铺不存在！',
        data: {}
      })
    }
  }
  // 搜索商铺或商品
  async search (req, res, next) {
    let { keyword } = req.query;
    keyword = keyword.replace(/\s+/g,'');
    if (!keyword) {
      res.status(401).send({
        status: 401,
        msg: '关键字为空',
        data: {}
      })
      return false
    }
    let isExits = await hotSearchModel.find({name: keyword});
    if (isExits.length === 0) {
      let create = new hotSearchModel({
        name: keyword,
        heat: 0
      })
      create.save();
    } else {
      await hotSearchModel.updateOne({name: keyword},{$inc: {heat: 1}});
    }

    let result = await shopModel.find({keywords: new RegExp(keyword)});
    res.status(200).send({
      status: 200,
      msg: '返回结果！',
      data: result
    })
  }
  // 获取热门搜索
  async getHotSearch (req, res, next) {
    let result = await hotSearchModel.find();
    res.status(200).send({
      status: 200,
      msg: '获取成功',
      data: result
    })
  }
  Md5(data){
		const md5 = crypto.createHash('md5');
		return md5.update(data).digest('base64');
  }
  randomId () {
    return Math.random().toString(16).slice(2,15).toLowerCase()
  }
  // 去重
  clearRepeat (el) {
    console.log(el)
    return
  }
}

export default new Shop()