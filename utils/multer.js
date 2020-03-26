// multer处理的请求不能设置请求头 Content-Type, 将contentType 设置成 false 即可，multer 服务器会自动识别添加 Content-Type
// 若设置了请求头则无法创建文件
import multer from 'multer'
// 存储图片
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/resource/web项目/移动端美团/tt-app-server/public')
  },
  filename: function (req, file, cb) {
    if (req.params.goodsid) {
      cb(null,  req.session.userInfo.username + '-' + req.params.goodsid +'-'+file.fieldname+'.' + file.originalname.split('.')[file.originalname.split('.').length-1])
    } else if (file.fieldname.indexOf('shop') != -1) {
      cb(null,  req.session.userInfo.username + '-'+file.fieldname+'.' + file.originalname.split('.')[file.originalname.split('.').length-1])
    }
  }
})
let upload = multer({ storage: storage })
export default upload