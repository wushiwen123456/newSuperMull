<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    //1.创建BScroll对象
    this.scroll  =  new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,  //-设置为2或者3时才能监听滚动的高度
      pullUpLoad:this.pullUpLoad //-设置为true时才能监听上拉刷新方法
    })  

    //2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) => {
        // console.log(position)
        this.$emit('scroll',position)
      })
    }

    //3.上拉加载回调
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    //回到顶部方法
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    //加载更多方法
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    //重置scroll方法
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    //得到滚动的Y值
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style>

</style>