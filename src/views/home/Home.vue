<template>
  <div id="home">
    <!-- <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar> -->
    <!-- 引入轮播插件 -->
    <!-- <home-swiper :banners="banners"/> -->
    <!-- 轮播下面的圆形图 -->
    <!-- <recommend-view :recommends="recommends"/> -->
    <!-- 推荐部分 -->
    <!-- <feature-view/> -->
    <!-- <tab-control :titles="['流行','新款','精选']" class="tab-control-home" /> -->
  </div>
</template>

<script>
import HomeSwiper from './clildComps/HomeSwiper'
import RecommendView from './clildComps/RecommendView'
import FeatureView from './clildComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata} from 'network/home'


export default {
  name:"Home",
  data(){
    return {
      banners:[],
      recommends:[],
    }
  },
  components:{
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl
  },
  created(){
    //1. 请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
    margin-bottom: 1000px;
    overflow: hidden;
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

 .slider-wrapper{
   position: relative;
 }
 .swiper-pagination .swiper-pagination-bullet {
  width:20px;
  height: 4px;
  display: inline-block;
  border-radius: 3px;
  background: #fff;
  /* opacity: 0.2; */
  }
  .tab-control-home{
    position: sticky;
    top: 100px;
  }
</style>