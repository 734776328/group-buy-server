import express from 'express';
import user from '../../controller/user'
let router = express.Router();
router.get('/islogin', user.isLogin)
router.get('/loginout', user.loginOut);
router.post('/session/mail', user.mailLogin);
router.post('/session/username', user.usernameLogin);
router.post('/user/:mail', user.register);
router.put('/user/:id', user.changePassword);
router.patch('/user/:id', user.changePicture);
router.get('/user/:id', user.getUserInfo);
router.get('/user/:id/orders', user.orders);
router.put('/user/:mail/orders', user.placeOrder);
router.get('/verifyCode', user.verifyCode);

export default router;