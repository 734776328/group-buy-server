import shopModel from '../../models/shop/shop.js'
import goodsModel from '../../models/shop/goods.js'
import keywordModel from '../../models/shop/keyword.js'
import hotSearchModel from '../../models/shop/hotSearch.js'
class Shop {
  constructor () {
    this.getShops = this.getShops.bind(this)
    this.goods = this.goods.bind(this)
    this.getShopDetaile = this.getShopDetaile.bind(this)
    this.getGoodsDetaile = this.getGoodsDetaile.bind(this)
    this.getShopInfo = this.getShopInfo.bind(this)
    this.search = this.search.bind(this)
    this.createShop = this.createShop.bind(this)
    this.addGoods = this.addGoods.bind(this)
  }
  // 添加商品
  async goods (req, res, next) {
    const { shopname, adder, goodsname} = req.body;
    var insert = new goodsModel({
      userMail: '748642911@qq.com',
      shopId: 'zhanghuan1111',
      shopname: shopname,
      adder: adder,
      imgUrl: [
        'https://p1.meituan.net/320.0/tdchotel/e9e6284143e395cbabbd8a48302c5696103878.jpg',
        'https://p0.meituan.net/320.0/tdchotel/499dae486b4a2daefe3e85056867dc5e75451.jpg',
        'https://p0.meituan.net/320.0/tdchotel/643db009d34b9bd492f87bb3188650bc79635.jpg'
      ],
      goods: {
        goodsId: this.randomId(),
        goodsname: goodsname,
        originPrice: '89.00',
        preferentialPrice: '66.00',
        consumeSum: 18,
        backTime: 1,
        overdueBack: 1,
        slideImg: [
          'https://p0.meituan.net/merchantpic/f934f89320f9227d6238927c61a61e68112011.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0', 
          'https://p0.meituan.net/merchantpic/febfb8b61871ceedd3ed6e88e7fd4d3e88732.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0',
          'https://p0.meituan.net/dpdeal/6a8e3950977543e53f1ecabcfac677193754273.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0',
          'https://p0.meituan.net/merchantpic/a8219e9c30abc0683f4b91560c4338d258856.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0',
          'https://p0.meituan.net/merchantpic/537dea1f02d2d683814bcdc1db1998e573705.jpg%40450w_280h_1e_1c_1l%7Cwatermark%3D0'
        ],
        imgDescribe: [
          'https://p0.meituan.net/dpdeal/3f67737e108f06b43d76a4f7fbf68ee9576970.jpg%40450w_1024h_1e_1l%7Cwatermark%3D0',
          'https://p1.meituan.net/dpdeal/40ad8356597fdaf740a664985101ed1a95296.jpg%40450w_1024h_1e_1l%7Cwatermark%3D0',
          'https://p1.meituan.net/dpdeal/4fd4932ac32f45d38b2f2f10d1ec1d39150864.jpg%40450w_1024h_1e_1l%7Cwatermark%3D0'
        ],
        periodValidity: 60,
        appointmentTime: 1,
        usePeople: 1,
        evaluateCount: 1,
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
      res.send(resulte)
    })
    
  }

  //创建商铺 
  async createShop (req, res, next) {
    const { mail, shopname, adder, shopid } = req.body;
    let describe = '海珠区前进路146号晓港公园内 正门进往右200米清竹园内'
    let create = new shopModel({
      shopId: shopid,
      userMail: mail,
      shopName: shopname,
      adder: adder,
      imgUrl: [
        'https://p1.meituan.net/320.0/tdchotel/e9e6284143e395cbabbd8a48302c5696103878.jpg',
        'https://p0.meituan.net/320.0/tdchotel/499dae486b4a2daefe3e85056867dc5e75451.jpg',
        'https://p0.meituan.net/320.0/tdchotel/643db009d34b9bd492f87bb3188650bc79635.jpg'
      ],
      describe: '蛋雕DIY,雕刻你想要的一切',
      consumptionPerPerson: 30
    })
    create.save( (err, resulte) => {
      if (err) {
        console.log(err)
        res.status(503).send({
          msg: '服务器繁忙！',
          data: {}
        })
        return false;
      }
      res.status(200).send({
        msg: '创建成功',
        data: {}
      })
    })
  }
  // 添加商品
  async addGoods (req, res, next) {
    // req.body 自动会将JSON数据转为对象
    // let { goodsData } = req. body
    // goodsData = JSON.parse(goodsData)
    // goodsData.goodsId = this.randomId()
    // console.log(goodsData)
    // let { username, mail } = req.session.userInfo
    // let create = new goodsModel({
    //   mail: mail,
    //   shopId: '000000000',
    //   goods: goodsData.goods
    // })
    // create.save( (err, result) => {
    //   if (err) {
    //     console.log( err );
    //     res.status(500).send({
    //       msg: '服务器繁忙，请稍后再试！',
    //       data: {}
    //     })
    //     return false;
    //   }
    // } )
  }
  // 返回所有商铺
  async getShops (req, res, next) {
    let result = await shopModel.find();
    res.status(200).send({
      msg: '获取成功',
      data: result
    })
  }
  // 返回某个商铺的详情,包括商品信息
  async getShopDetaile (req, res, next) {
    console.log(req.params)
    const { shopid } = req.params;
    let resultGoods = await goodsModel.find({shopId: shopid});
    let shopInfo = await shopModel.findOne({shopId: shopid});
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
      await hotSearchModel.update({name: keyword},{$inc: {heat: 1}});
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