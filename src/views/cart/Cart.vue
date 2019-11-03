<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll" >
      <cart-list :cart-list="list" v-if="isCartShow"></cart-list>
      <div v-else class="else">
      <img src="~assets/img/cart/e18d20c94006dfe0-9eef65073f0f6be0-a28eac0c0a0cb1db2eab069f02e8229d.gif" alt="">
      别看了啥都没有，快去购物把~~
    </div>
    </scroll>
    
    <cart-bottom-bar/>
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from "vuex";
export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed:{
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    }),
    isCartShow(){
      return !!this.list.length
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
  }
}
</script>

<style scoped>
    #cart{
      height: 100vh;
    }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px - 40px);
    width: 100vw;
    overflow: hidden;
  }
  .else{
    height: calc(100vh - 44px - 49px);
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
  }
  .else>*{
    margin-bottom: 3vw;
  }
</style>