<template>
  <div v-if="recommendList.length" class="detail-recommend">
    <div class="title">热门推荐</div>
    <div class="recommend-list">
      <goods-list-item v-for="(item,index) in recommendList" 
                      :key="index"
                      :imgUrl="['image']" 
                      :goods-item="item"
                      :isMethod="false"/>
    </div>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'
export default {
  name:"DetailRecommendInfo",
  props:{
    recommendList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
  .detail-recommend{
    padding: 7px 10px 0;
    box-sizing: border-box
  }
  .title{
    font-size: 14px;
    margin-bottom: 15px;
  }
  .recommend-list{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 10px
  }
</style>