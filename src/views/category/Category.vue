<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center" >商品分类</div>
    </nav-bar>
    <div class="content">
      <!-- better-scroll左侧滚动区域 -->
      <tab-menu :categories="categories" @selectItem="selectItem"/>
      <!-- better-scroll右侧滚动区域 -->
      <scroll class="tab-content" ref="scroll" @scroll="toScroll" :probe-type="1">
        <tab-count :subcategories="showSubcategory" />
        <tab-control :titles="['新品','流行','销量']" ref="tabControl" @click.native="tabControlClick"/>
        <tab-count-detail :goodsInfo="showCategoryDetail" />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childcomps/TabMenu'
import TabCount from './childcomps/TabCount'
import TabCountDetail from './childcomps/TabCountDetail'

// 导入公共组件
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'

// 导入请求网络数据的方法
import { getCategory,getSubCategory,getCategoryDetail } from 'network/category'

// 导入公用方法
import {POP, SELL, NEW} from "common/const";
import { throttle } from "common/utils";

export default {
  name:"Category",
  components:{
    NavBar,
    TabMenu,
    TabCount,
    Scroll,
    TabCountDetail,
    TabControl
  },
  data(){
    return {
      categories:[],
      categoryData:{},
      currentIndex:-1 ,
      currentType:'new',
      throttle:""
    }
  },
  created(){
    this._getCategory()
  },
  mounted(){
    // 加载节流函数 
    this.throttle = throttle(this.$refs.scroll.refresh,50)
  },
  computed:{
    showSubcategory() {
		  if(this.currentIndex !== -1){
        return  this.categoryData[this.currentIndex].subCategories.list
      }
      return []
    },
    showCategoryDetail() {
		  if(this.currentIndex !== -1){ 
        return  this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
      return []
    }
  },
  methods:{
    _getCategory(){
      getCategory().then(res => {
        // 拿到数据
        this.categories = res.data.category.list

        // 遍历数据，对categoryData进行数据结构初始化
        for (let i = 0; i < this.categories.length; i++){
          this.categoryData[i] = {
            subCategories : "",
            categoryDetail:{
              'pop':[],
              'new':[],
              'sell':[]
            }
          }
        }
        // 页面载入时先把第一页数据加载出来
        this._getSubcategories(0)
      })
    },
    
    // 事件响应的方法
    selectItem(index){
      this._getSubcategories(index)
    },

    // 通过点击获取的index值来对数据进行切换
    _getSubcategories(index){
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey
      getSubCategory(maitKey).then(res => {
        this.categoryData[index].subCategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
      })
    },
    _getCategoryDetail(type){
      const miniWallkey = this.categories[this.currentIndex].miniWallkey
      getCategoryDetail(miniWallkey,type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type]=res  
        this.categoryData = {...this.categoryData}
      })
    },
    // 监听tabBar的点击
    tabControlClick(){
      const index =  this.$refs.tabControl.currentIndex
      switch (index) {
        case 0 :
          if(~!!this.currentType.indexOf('new')) this.currentType = 'new'
          break;
        case 1:
          if(~!!this.currentType.indexOf('pop')) this.currentType = 'pop'
          break;
        case 2:
          if(~!!this.currentType.indexOf('sell')) this.currentType = 'sell'
          break;
      }
      console.log(this.currentType)
      
    },
    toScroll(){
      console.log('-----')
    }
  },
  updated(){
    // 页面加载时刷新scroll
    this.throttle()
  }
  

}
</script>

<style scoped>
.category{
  height: 100vh;
  position: relative;
}
.nav-bar{
  background: var(--color-tint);
  color: #fff;
  font-size: 15px;
}
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}
.tab-content{
  width: 80%;
  height: 100%;
  overflow: hidden;
}
</style>