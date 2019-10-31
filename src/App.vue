<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabBar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
export default {
  name: 'App',
  components:{
    MainTabBar
  }
} 
</script>

<style>
  /* 引入公共样式 */
  @import "assets/css/base.css";
 
 
</style>
