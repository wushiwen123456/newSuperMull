<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
       
    <!-- 使用better-scroll组件 -->
    <scroll class="content" ref="scroll">
      <!-- 引入轮播插件 -->
      <home-swiper :banners="banners"/>
      <!-- 轮播下面的圆形图 -->
      <recommend-view :recommends="recommends"/>
      <!-- 推荐部分 -->
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" class="tab-control-home" @tabClick="tabClick" />
      <!-- 流行--新款--精选 -->
      <goods-list :goods="showGoods"  />
    </scroll> 

    <!-- 回到顶部 .native
      当我们在父组件给子组件添加原生事件时用.native
    -->
    <back-top @click.native="backClick"></back-top>
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
      currentType:'pop'
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
    },


    /*
      获取网络请求相关方法
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
   height: 100vh;
   position: relative;
  }
 .home-nav{
   background-color: var(--color-tint);
   color: #fff;
   position: fixed;
   left: 0;
   right: 0;
   top: 0;
   z-index: 8;
 }
  .tab-control-home{
    position: sticky;
    top: 44px;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;
  }
</style>