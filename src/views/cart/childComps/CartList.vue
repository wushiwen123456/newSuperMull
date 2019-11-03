<template>
  <div class="cartlist">
    <div v-for="(item,index) in cartList" :key="index" class="list-item">
      <checked-button :is-checked="item.checked" @click.native="checkedClick(index)"/>
      <div class="item-img"><img :src="item.image" alt=""></div>
      <div class="item_text">
        <p class="text title">{{item.title}}</p>
        <p class="text desc">{{item.desc}}</p>
        <div class="price">
          <span class="new-price">{{item.newPrice}}</span>
          <span class="item-count">{{item.count | count}}</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import CheckedButton from 'components/content/checkedButton/CheckedButton'
export default {
  name:"CartList",
  props:{
    cartList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    CheckedButton
  },
  methods:{
    checkedClick(index){
      this.cartList[index].checked = !this.cartList[index].checked
    }
  },
  filters:{
    count(value){
      return 'x'+value 
    }
  }
}
</script>

<style scoped>
  .list-item{
    padding: 20px 15px 20px 10%;
    display: flex;
    height: 120px;
    position: relative;
    justify-content: space-between;
    border-bottom: 1px dashed #aaa;
  }
  
  .list-item>.item-img{
    height: 100%;
  }
  .item-img>img{
    height: 100%;
    border-radius: 4px
  }
  .item_text{
    width:80%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  
  .item_text>.text{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .title{
    color: #2b2b2b;
    font-size: 16px;
  }
  .desc{
    font-size: 1px; 
  }
  .price{
    display: flex;
    justify-content: space-between
  }
  .new-price{
    font-size: 1.2rem;
    color: #ee9871;
  }
</style>