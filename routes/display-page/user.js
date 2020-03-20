import express from 'express';
import user from '../../controller/user'
let router = express.Router();
// 登录状态
router.get('/islogin', user.isLogin)
// 退出登录
router.get('/loginout', user.loginOut);
// 邮箱登录
router.post('/session/mail', user.mailLogin);
// 账号密码登录
router.post('/session/username', user.usernameLogin);
// 邮箱注册
router.post('/user/:mail', user.register);
// 修改密码
router.put('/user/:id', user.changePassword);
// 改变头像
router.patch('/user/:id', user.changePicture);
// 获取用户信息
router.get('/user/:id', user.getUserInfo);
// 获取订单信息
router.get('/user/:id/orders', user.orders);
// 下单
router.put('/user/:mail/orders', user.placeOrder);
// 获取验证码
router.get('/verifyCode', user.verifyCode);

export default router;