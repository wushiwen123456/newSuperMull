  //导入request网络请求方法
import {request} from './request'
/**
 * 
 * @param {id} iid 
 * 通过商品id获取不同的数据
 */
export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid,
    }
  })
}
/**
 * 获取/recommend地址的数据
 */
export function getRecommend() {
  return request({
    url: '/recommend'
  })
} 
//导入商品数据,对数据进行转接
export class Goods {
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//导入商店数据，对数据进行转接
export class shop {
  constructor(shopInfo){
    this.log = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

// 导入参数数据
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}