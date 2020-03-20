import crypto from 'crypto'
import redisClient from '../../dbs/redis.js'
import Email from '../../utils/smtp'
import userModel from '../../models/user/user.js'
import shop from '../../models/shop/shop.js'
import goods from '../../models/shop/goods.js'
let nodeMailer = require('nodemailer');
class User {
  constructor () {
    this.mailLogin = this.mailLogin.bind(this);
    this.usernameLogin = this.usernameLogin.bind(this);
    this.loginOut = this.loginOut.bind(this);
    this.register = this.register.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePicture = this.changePicture.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.orders = this.orders.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
    this.Md5 = this.Md5.bind(this);
  }
  // 退出登录
  loginOut (req, res, next) {
    delete req.session.userInfo
    res.status(200).send({
      msg: '已退出登录！',
      data: {}
    })
    // res.status(400).send('Bad Request');
  }
  // 判断是否登录
  isLogin (req, res, next) {
    if (!req.session.userInfo) {
      // res.redirect(301, 'http://localhost:8080/#/login');
      res.status(401).send({
        msg: '未登录!',
        data: {}
      })
    } else {
      res.status(200).send({
        status: 200,
        msg: '已登录!',
        data: req.session.userInfo
      })
    }
  }
  // 账号密码登录
  async usernameLogin (req, res, next) {
    const {username, password} = req.body;
    if (username.indexOf(' ') !== -1 || password.indexOf(' ') !== -1) {
      res.status(401).send({
        status: 401,
        msg: '账号密码不能为空！',
        data: {}
      })
      return false;
    }
    const result = await userModel.findOne({username, password});
    if (!result) {
      res.status(401).send({
        status: 401,
        msg: '账号或密码错误',
        data: {}
      })
    } else {
      req.session.userInfo = result
      res.status(200).send({
        status: 200,
        msg: '登录成功',
        data: {
          name: result.name,
          username: result.username,
          shopId: result.shopId,
          headPortrait: result.headPortrait,
          mail: result.mail,
          merchant: result.merchant
        }
      })
    }
  }
  // 邮箱登录
  mailLogin (req, res, next) {
    const { mail, code } = req.body;
    if (!mail || !code ) {
      res.status(401).send({
        msg: '请输入正确的邮箱'
      })
      return false;
    }
    
    redisClient.get(`mail:${mail}`, async (err, result) => {
      if ( err || !result ) {
        res.status(503).send({
          msg: '请重试！',
          data: {}
        })
        return false;
      }
      if (code.toLowerCase() != result.toLowerCase() ) {
        res.status(400).send({
          msg: '请输入正确的验证码',
          data: {}
        })
        return false;
      } else {
        let userInfo = await userModel.findOne({mail})
        redisClient.del(`mail:${mail}`)
        if ( userInfo == null ) {
          req.session.register = mail;
          // res.redirect(`register/${mail}`);
          res.status(200).send({
            msg: '账号未注册！',
            data: null
          })
        } else {
          console.log('--邮箱登录--')
          req.session.userInfo = userInfo
          console.log(req.session)
          console.log('--邮箱登录--')
          res.status(200).send({
            msg: '登陆成功！',
            data: {
              name: userInfo.name,
              username: result.username,
              shopId: result.shopId,
              headPortrait: userInfo.headPortrait,
              mail: userInfo.mail
            }
          })
        }
      }
    })
    
  }
  // 用户注册
  register (req, res, next) {
    const { username, password } = req.body;
    const { mail } = req.params;
    if ( !req.session.register || req.session.register !== mail ) {
      res.status(401).send({
        msg: '无效访问',
        data: {}
      })
      return false;
    }
    if ( !username || !password || !mail ) {
      res.status(400).send({
        msg: '账号、密码为空，请重试！',
        data: {}
      })
      return false
    }
    let create = new userModel ({
      mail: mail,
      username: username,
      password: password,
      name: '爱泡温泉的小雪人',
      orders: [],
    })
    create.save( async (err, result ) => {
      if ( err ) {
        console.log( err );
        res.status(500).send({
          msg: '服务器繁忙，请稍后再试！',
          data: {}
        })
        return false;
      }
      let userInfo = await userModel.findOne({mail})
      req.session.userInfo = userInfo
      delete req.session.register
      res.status(200).send({
        msg: '注册成功!',
        data: {
          status: 200,
          userInfo: {
            mail: userInfo.mail,
            name: userInfo.name,
            headPortrait: userInfo.headPortrait,
          }
        }
      })
    })
  }
  // 修改密码
  async changePassword (req, res, next) {
    if ( !req.session.userInfo ) {
      res.status(401).send({
        msg: '未登录状态！',
        data: {}
      })
      return false;
    }
    const { password } = req.body;
    const test = req.body;
    console.log(test)
    const { mail } = req.session.userInfo;
    if ( !password ) {
      res.status(401).send({
        msg: '请输入密码！',
        data: {}
      })
      return false;
    }
    // let verify = await userModel.findOne({ mail,password: oldpassword });
    // if ( !verify ) {
    //   res.status(401).send({
    //     msg: '旧密码错误，请重试',
    //     data: {}
    //   })
    //   return false;
    // }
    let result = await userModel.updateOne({ mail }, {password: password});
    if ( result === 0 ) {
      res.status(401).send({
        msg: '系统繁忙,请重试！',
        data: {}
      })
      return false;
    }
    req.session.userInfo = await userModel.findOne({mail}); 
    res.status(200).send({
      msg: '修改成功！',
      data: {}
    })
  }
  // 修改用户头像
  changePicture (req, res, next) {
    if ( !req.session.userInfo ) {
      res.status(401).send({
        status: 401,
        msg: '未登录！',
        data: {}
      })
      return false;
    }

  }
  // 获取用户信息
  getUserInfo (req, res, next) {
    if ( !req.session.userInfo ) {
      res.status(401).send({
        status: 401,
        msg: '未登录！',
        data: {}
      })
      return false;
    }
    console.log(req.session)
    res.status(200).send({
      msg: '获取成功！',
      data: req.session.userInfo
    })
  }
  // 获取订单列表
  async orders (req, res, next) {
    if ( !req.session.userInfo ) {
      res.status(401).send({
        msg: '未登录',
        data: {}
      })
      return false;
    }
    const { mail } = req.session.userInfo;
    let result = await userModel.findOne({ mail })
    if ( !result ) {
      res.status(503).send({
        msg: '服务器繁忙，请重试！',
        data: {}
      })
      return false;
    }
    res.status(200).send({
      msg: '获取成功！',
      data: result.orders
    })
  }
  // 用户下单
  async placeOrder (req, res, next) {
    if ( !req.session.userInfo ) {
      res.status(401).send({
        msg: '未登录',
        data: {}
      })
      return false;
    }
    const { shopid, goodsid, count } = req.body;
    const { mail } = req.session.userInfo;
    if ( !shopid || !goodsid ) {
      res.status(401).send({
        msg: '参数错误，请重试！',
        data: {}
      })
      return false;
    }
    // 找出哪间商铺
    let shopResult = await shop.findOne({shopId: shopid});
    let goodsData = '';
    shopResult.goods.some( (item) => {
      if (item.goodsId === goodsid) {
        goodsData = item;
        return true
      }
    })
    // 创建订单数据
    let orderDate = {
      orderId: this.Md5(mail),
      name: goodsData.name,
      imgUrl: goodsData.slideImg[0],
      count: 1,
      totalValue: goodsData.preferentialPrice? goodsData.preferentialPrice * count : goodsData.originPrice * count,
      status: 0
    }
    // 创建订单
    let data = userModel.updateOne({ mail }, {
      '$push': {
        'orders': orderDate
      }
    }, (err, result) => {
      if (err) {
        res.status(503).send({
          msg: '服务器繁忙！',
          data: {}
        })
      }
    });
    res.status(200).send({
      msg: '下单成功！',
      data: {}
    })
  }
  // 发送验证码
  verifyCode (req, res, next) {
    const { mail } = req.query;
    const code = Email.code();
    let transporter = nodeMailer.createTransport({
      host: Email.host,
      port: 587,
      secure: false,
      auth: {
        user: Email.user,
        pass: Email.pass
      }
    })
    redisClient.set(`mail:${mail}`, code, 60, (err,result) => {
      if (err) {
        console.log(err)
      }
    });
    let mailOptions = {
      from: `认证邮件 <${Email.user}>`,
      to: mail,
      subject: '《团团》 注册码',
      html: `您在《团团》中注册了账号，注册码为：${code}`
    }
    transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        return console.log('发送验证码失败',err)
      } else {
        res.send({
          msg: '验证码已发送, 可能会有延时, 有效期1分钟',
          data: {}
        })
      }
    })
  }
  Md5(data){
		const md5 = crypto.createHash('md5');
		return md5.update(data).digest('base64');
  }
}
export default new User()