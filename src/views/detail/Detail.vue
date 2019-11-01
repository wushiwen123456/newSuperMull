<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <!-- 使用better-scroll组件 -->
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detial-base-info :goods="Goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="DetailParamInfo" />
      <detail-comment-info :commont-info="commontInfo"/>
      <detail-recommend-info :recommend-list="recommendList" />
    </scroll>
    <main-tab-bar />
  </div>
</template>

<script>
//导入组件模块
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetialBaseInfo from './childComps/DetialBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'

// 导入公共模块
import Scroll from 'components/common/scroll/Scroll'
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

//导入网络请求模块
import {getDetail,Goods,shop,GoodsParam,getRecommend} from 'network/detail'

//导入工具类
import { throttle } from "common/utils"

export default {
  name:"Detail",
  data(){
    return {
      iid:null,
      topImages:[],
      Goods:{},
      shop:{},
      detailInfo:{},
      DetailParamInfo:{},
      commontInfo:{},
      recommendList:[],
      canRun:""//保存节流函数
    }
  },
  components:{
    DetailNavBar,
    DetailSwiper,
    DetialBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,

    MainTabBar,
    Scroll,
   
  },
  created(){
    this._getDetailData()
    this._getRecommendData()
  },
  methods:{
    //在子组件mounted时刷新一次scroll
    imageLoad(){
      this.$refs.scroll.refresh()
    },
    //在监听到滚动时使用节流刷新scroll
    contentScroll(position){
      this.canRun()
    },

    //封装请求数据的方法
    _getDetailData(){
       //1.保存传进来的iid
      this.iid = this.$route.params.id
      const iid = this.iid
      //2.根据iid获取不同的数据
      getDetail(iid).then(res => {
        const data = res.result
        if(data){
          //获取顶部图片数据
          this.topImages = data.itemInfo.topImages

          //获取商品信息数据
          this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

          //获取店铺信息数据
          this.shop = new shop(data.shopInfo)

          //获取图片展示图片的数据
          this.detailInfo = data.detailInfo

          //获取参数数据
          this.DetailParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

          //获取评论信息 
          this.commontInfo = data.rate.list[0] || {};
        }
      })
    },
    _getRecommendData(){
      getRecommend().then((res,error) => {
        if(error) return 
        this.recommendList = res.data.list
      })
    }
  },
  mounted(){
    //在mounted中加载节流函数
    this.canRun = throttle(this.$refs.scroll.refresh,1000)
  }
  
  
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