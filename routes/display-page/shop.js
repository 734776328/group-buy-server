import express from 'express'
import shop from '../../controller/shop'

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

// ----test
router.post('/addgoods', shop.goods)
router.post('/shop', shop.createShop);


export default router