<template>
  <div class="cartlist">
    <div v-for="(item,index) in cartList" :key="index" class="list-item">
      <checked-button :is-checked="item.checked" @click.native="checkedClick(index)"/>
      <div class="item-img"><img :src="item.image" alt=""></div>
      <div class="item_text">
        <p class="text title">{{item.title}}</p>
        <p class="text desc">{{item.desc}}</p>
        <div class="price">
          <span class="new-price">{{realPrice(index)}}</span>
          <div class="count-box">
             <sub-count @subClick="subClick(index)"/>
            <input type="number" v-model.number="item.count" @input="input(index)" >
             <add-count @addClick="addClick(index)"/>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import CheckedButton from 'components/content/checkedButton/CheckedButton'
import AddCount from './AddCount'
import SubCount from './SubCount'
import { mapGetters } from 'vuex'
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
    CheckedButton,
    AddCount,
    SubCount
  },
  computed:{
    ...mapGetters({
      list:'cartList'
    }),
  },
  methods:{
    checkedClick(index){
      this.cartList[index].checked = !this.cartList[index].checked
    },
    addClick(index){
        this.list[index].count++
        this.list[index].checked = true
    },
    subClick(index){
      let count = this.list[index].count
      if(count>1){
        this.list[index].count--
        this.list[index].checked = true
      }
    },
    realPrice(index){
      return (this.list[index].count * this.list[index].newPrice).toFixed(2)
    },
    input(index){
      this.list[index].checked = true
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
  .count-box{
    width: 40%;
    display: flex;
    justify-content: space-between;
  }
  .count-box>input{
    width: 30px;
    text-align: center;
  }
</style>