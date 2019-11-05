<template>
    <swiper v-if="topImages.length" class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <a :href="'http:'+item">
          <img :src="item" alt="">
        </a>
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:"DetailSwiper",
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isSwiper:true
    }
  },
  components:{
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
  .detail-swiper{
    height: 300px ;
  }
  .swiper-item{
    
  }
</style>