<template>
  <scroll class="tab-menu-content">
    <ul class="tab-menu">
      <li v-for="(item,index) in categories" 
          :key="index" 
          class="tab-menu-item"
          :class="{active:index === currentIndex}"
          @click="itemClick(index)">
          {{item.title}}
      </li>
    </ul>
  </scroll>
  
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

export default {
  name:"TabMenu",
  components:{
    Scroll
  },
  props:{
    categories:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
      this.$emit('selectItem',index)
    }
  }
}
</script>

<style scoped>
  .tab-menu{
    width: 100%;
  }
  .tab-menu-item{
    height: 55px;
    line-height: 55px;
    text-align: center;
    font-size: 16px;
  }
  .tab-menu-content{
    height: 100%;
    overflow: hidden;
    width: 25%;
    background-color: #f6f6f6;
  }
  .active{
    background-color: #fff;
    font-weight: 600;
    position: relative;
  }
  .active::before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: var(--color-high-text);
  }
</style>