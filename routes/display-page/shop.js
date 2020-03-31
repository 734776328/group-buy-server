import express from 'express'
import shop from '../../controller/shop'
import upload from '../../utils/multer'

let router = express.Router()

// 返回所有商铺的信息
router.get('/shops', shop.getShops);
//返回某个商铺的详细信息，包括商品基本信息
router.get('/shops/:shopid/', shop.getShopDetaile);
// 返回某个商铺的基本信息
router.get('/shop/:shopid', shop.getShopInfo);
// 返回某个商品的详情信息
router.get('/shops/:shopid/:goodsid', shop.getGoodsDetaile);
// 用户搜索商铺或商品
router.get('/search', shop.search);
// 热门搜索
router.get('/hotsearch', shop.getHotSearch);
// 添加商品
router.put('/goods', shop.addGoods)
// 修改商品
router.put('/goods/:goodsid', shop.changeGoods)
// 保存商铺图片地址
router.post('/shopimg', upload.any(), shop.saveShopImg)
// 保存商品图片地址
router.post('/goodsimg/:goodsid', upload.any(), shop.saveGoodsImg)
// 创建商铺
router.put('/shops', shop.createShop)
// 删除商品
router.put('/:username/:goodsid', shop.deleteGoods)
// ----test
router.post('/addgoods', shop.addGoods)
// 添加城市 -test
router.get('/addCity', shop.addCity)


export default router