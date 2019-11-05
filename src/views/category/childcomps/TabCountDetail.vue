<template>
  <div class="goods-detail">
    <goods-list-item 
      v-for="(item,index) in goodsInfo"
      :goodsItem="item"
      :key="index"
      :imgUrl="['img']"/>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name:"TabCountDetail",
  props:{
    goodsInfo:{
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
  .goods-detail{
   display: grid;
   grid-template-columns: repeat(2,1fr);
   grid-gap: 10px;
   padding: 0 10px;
  }
</style>