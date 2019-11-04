<template>
  <div id="cart" class="relative" :style="{height:innerHeight}" >
    <nav-bar class="nav-bar" :class="{edit:!isEdit}">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" @click="dateUpEdit">{{state}}</div>
    </nav-bar>
    <scroll class="content" ref="scroll" >
      <cart-list :cart-list="list" v-if="isCartShow"></cart-list>
      <div v-else class="else">
        <img src="~assets/img/cart/timg.jpg" alt="">
        {{helloUser}}                                        
      </div>
    </scroll>
    
    <cart-bottom-bar v-if="isEdit"/>
    <edit v-else />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'
import Edit from './childComps/Edit'
import { mapGetters } from "vuex";
export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Scroll,
    Edit
  },
  data(){
    return {
      isEdit:true,

    }
  },
  computed:{
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    }),
    isCartShow(){
      return !!this.list.length
    },
    innerHeight(){
      return window.innerHeight + "px"
    },
    // 管理购物车
    state(){
      if(this.isEdit){
        return "管理"
      }else{
        return "完成"
      }
    },
    helloUser(){
      if(this.isEdit) return '别看了啥都没有，快去加购把~~'
      return '亲，您的购物车很干净哦~~'
    }
 
  },
  activated(){
    if(this.isCartShow){
      this.$refs.scroll.refresh()
    }
  },
  watch:{
    length(val){
      this.$refs.scroll.refresh()
    }
  },
  methods:{
    dateUpEdit(){
      this.isEdit = !this.isEdit
      
      if(this.isCartShow){
        this.list.forEach(item => item.checked = false)

      }
    }
  }
}
</script>

<style scoped>
    #cart{
      position: relative;
      overflow: hidden;
       display: flex;
    justify-content: space-between;
    flex-direction: column;
    }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 9; 
  }
  .nav-bar>*{
    width: 100%;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .else{
    height: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
  }
  .else>*{
    margin-bottom: 3vw;
  }
  .edit{
    background-color: rgba(66, 108, 253, 1);
  }
</style>