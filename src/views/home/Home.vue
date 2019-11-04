<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl1"
                    class="tab-control1"
                    v-show="isTabFixed"/>
    <!-- 使用better-scroll组件 -->
    
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <!-- 引入轮播插件 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 轮播下面的圆形图 -->
      <recommend-view :recommends="recommends"/>
      <!-- 推荐部分 -->
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl2"
                    :class="{fixed:isTabFixed}"/>
      <!-- list数据部分 -->
      <goods-list :goods="showGoods" />
    </scroll> 

    <!-- 回到顶部 .native
      当我们在父组件给子组件添加原生事件时用.native
    -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './clildComps/HomeSwiper'
import RecommendView from './clildComps/RecommendView'
import FeatureView from './clildComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {
  getHomeMultidata,
  getHomeGoods      
}from 'network/home'

import {debounce,throttle} from 'common/utils'


export default {
  name:"Home",
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]}
        ,'new':{page:0,list:[]}
        ,'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      canRun:""
    }
  },
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created(){
    //1. 请求多个数据
      this.getHomeMultidata()

    //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
  },
  mounted(){
    this.canRun = throttle(this.$refs.scroll.refresh,1000)
  },
  methods:{
    /*
      事件监听相关的方法
    */ 
    tabClick(index){
      switch (index) {
        case 0 :
          this.currentType = 'pop'
          break
        case 1 :
          this.currentType = 'new'
          break
        case 2 :
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    /*
      获取网络请求相关方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        if(!!res){
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        if(!!res){
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
        }
      }).catch(err => {
        throw err
      })
    },
                                                                      
    //回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   )
    },
    //设置滚动事件  
    contentScroll(position){  
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop

      // 刷新滚动
      this.canRun()
    },
    //加载更多方法
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  /**
   * 保存离开时滚动的位置，下次点击进入的时候自动到这里
   */
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  }
}
</script>

<style scoped>
  #home{
   height: 100vh;
   position: relative;
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
   position: fixed;
   top: 0;
   width: 100vw;
   z-index: 999;
 }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 32;
  }
  .tab-control1{
    position: fixed;
    top: 44px;
    width: 100vw;
    background-color: #fff;
  }
</style>