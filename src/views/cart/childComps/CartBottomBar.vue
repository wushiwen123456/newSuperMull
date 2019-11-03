<template>
  <div class="bottom-bar" v-show="!!this.list.length">
    <div class="check-all" @click="checkedClick" >
      <checked-button :is-checked="isSellectAll" />
      <span>全选</span>
    </div>
    <div class="total-price" v-show="listCount">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" v-show="listCount">
      去结算({{listCount}})
    </div>
  </div>
</template>

<script>
import CheckedButton from 'components/content/checkedButton/CheckedButton'
import { mapGetters } from 'vuex'
export default {
  name:"bottom-bar",
  components:{
    CheckedButton
  },
  data(){
    return {
      clickList:[]
    }
  },
  computed:{
    ...mapGetters({
      list:'cartList'
    }),
    totalPrice(){
      return '¥' + this.list.filter(item => item.checked).reduce((preValue,item) => preValue + item.newPrice * item.count,0).toFixed(2)
    },
    listCount(){
      return this.list.filter(item => item.checked).length
    },
    isSellectAll(){
      return !!this.list.length && this.list.every(item => item.checked)
    }
  },
  methods:{
    checkedClick(){
      if(this.isSellectAll){
        this.list.forEach(x => x.checked = false)
      }else{
        this.list.forEach(x => x.checked = true)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 35px;
  }
  .check-all{
    width: 9vw;
    display: flex;
    align-items: center
  }
  .calculate{
    height: 100%;
    padding:0 10px;
    box-sizing: border-box;
    background-color: rgba(255, 51, 0,1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
  }
</style>