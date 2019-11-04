<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
                    @navBarClick="navBarClick" 
                    ref="detailNavBar"
                    :detailIndex="detailIndex"/>
    <!-- 使用better-scroll组件 -->
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detial-base-info :goods="Goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :goods-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="DetailParamInfo"/>
      <detail-comment-info ref="comment" :commont-info="commontInfo"/>
      <detail-recommend-info ref="recommend" :recommend-list="recommendList" />
    </scroll>
    <detail-bottom-bar class="detail-bottom" @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar'

// 导入公共模块
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


//导入网络请求模块
import {getDetail,Goods,shop,GoodsParam,getRecommend} from 'network/detail'

//导入工具类
import { throttle,getThemeTopYs,goOnce,debounce} from "common/utils"

// 映射vuexActions
import { mapActions } from 'vuex'
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
      themeTopYs:[],//保存y值
      canRun:"",//保存节流函数
      addThemeTopYs:"",//保存节流函数
      detailIndex:0,
      isShowBackTop:false,
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
    DetailBottomBar,
    Scroll,
    BackTop
  },
  created(){
    this._getDetailData()
    this._getRecommendData() 
  },
  methods:{
    // 映射vuexActions
    ...mapActions({
      add:'addCart'
    }),

    //在子组件mounted时刷新一次scroll
    imageLoad(){
      this.$refs.scroll.refresh()
    },
    //在监听到滚动时使用节流刷新scroll，并且监听顶部导航
    contentScroll(position){
      this.canRun()
      this.themeIndex(Math.abs(position.y),this.themeTopYs)
      this.isShowBackTop = (-position.y) > 1000;
    },

    //封装请求数据的方法
    _getDetailData(){
       //1.保存传进来的iid
      this.iid = this.$route.params.id
      const iid = this.iid
      //2.根据iid获取不同的数据
      getDetail(iid).then(res => {
        const data = res.result
        if(!!data){
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
         if(!!data.rate.list) this.commontInfo = data.rate.list[0]
         else{this.commontInfo = {}}
          
        }
      })
    },
    _getRecommendData(){
      getRecommend().then((res,error) => {
        if(error) return 
        if(res.data.list.length) this.recommendList = res.data.list
      })
    },
    // 导航点击切换事件
    navBarClick(index){
      // 获取相关元素的offsetTop值
         this.getThemeTopYs()    
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],0)
      this.detailIndex = index
    },
    //获取y值
    getThemeTopYs(){
          this.themeTopYs = []
          this.themeTopYs.push(0,
                    this.$refs.param.$el.offsetTop,
                    this.$refs.comment.$el.offsetTop,
                    this.$refs.recommend.$el.offsetTop,
                    Number.MAX_VALUE)              
    },
    
    /**
     * 根据传进来的number判断对应的数组的索引值
     * @param {Number} value 
     * @param {Array} arr 
    */
    themeIndex(value,arr) {
      let length = arr.length;
      for (let i = 0; i < length-1; i++){
        if((value >= this.themeTopYs[i] && value < this.themeTopYs[i+1])){
          this.detailIndex = i;
        }

      }
    },
    
   //回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,200)
    },
    //添加进购物车
    addToCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.Goods.title
      product.desc = this.Goods.desc
      product.newPrice = this.Goods.realPrice
      product.iid = this.iid
      //将商品添加到vuex中
      this.add(product).then(res => {
        this.$toast.show(res,700)
      })
    }
  },
  mounted(){
    //滚动时刷新scroll,使用节流函数
    this.canRun = throttle(this.$refs.scroll.refresh,300)    
    // 执行防抖加载this.themeTopYs
    this.addThemeTopYs =  debounce(this.getThemeTopYs,300)
  },
  updated(){
     this.addThemeTopYs()
  }
  
  
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
    overflow: hidden
  }
  .detail-bottom{
    height: 49px;
    /* background: red; */
    position: relative;
  }
</style>