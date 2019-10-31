<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detial-base-info :goods="Goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods-info="detailInfo"/>
    </scroll>
  </div>
</template>

<script>
//导入组件模块
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetialBaseInfo from './childComps/DetialBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'

// 导入公共模块
import Scroll from 'components/common/scroll/Scroll'

//导入网络请求模块
import {getDetail,Goods,shop} from 'network/detail'

export default {
  name:"Detail",
  data(){
    return {
      iid:null,
      topImages:[],
      Goods:{},
      shop:{},
      detailInfo:{}
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetialBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,

    Scroll,
   
  },
  created(){
    //1.保存传进来的iid
    this.iid = this.$route.params.id

  //2.根据iid获取不同的数据
      getDetail(this.iid).then(res => {
        const data = res.result
          //获取顶部图片数据
          this.topImages = data.itemInfo.topImages

          //获取商品信息数据
          this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //获取店铺信息数据
          this.shop = new shop(data.shopInfo)

          //获取图片展示图片的数据
          this.detailInfo = data.detailInfo
      })
  },
  
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>