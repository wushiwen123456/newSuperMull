<template>
  <div class="goods-item">
    <img :src="isImgUrl" alt="" @load="imgLoad" @click="itemClick">
    <div class="goods-info">
      <p>{{goodsItem[titleUrl]}}</p>
      <span class="price">{{goodsItem[priceUrl]}}</span>
      <span class="collect">{{goodsItem[cfavUrl]}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      } 
    },
    imgUrl:{
      type:Array,
      default(){
        return ['show','img']
      }
    },
    titleUrl:{
      type:String,
      default(){
        return 'title'
      }
    },
    priceUrl:{
      type:String,
      default(){
        return 'price'
      }
    },
    cfavUrl:{
      type:String,
      default(){
        return 'cfav'
      }
    },
    isMethod:{
      type:Boolean,
      default(){
        return true
      }
    }
  },
  methods:{
    imgLoad(){
      if(this.isMethod)
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      if(this.isMethod)
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed:{
    isImgUrl(){
      return this.imgUrl.reduce((a, i) => a && a[i], this.goodsItem)
    }
  }
    
  
  
}
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before{
    content: '';
    position: absolute;
    display: block;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>