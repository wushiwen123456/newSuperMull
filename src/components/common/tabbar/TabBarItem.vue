<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="ActiveStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#ffc0cb'
    }
  },
   computed:{
    isActive(){
      return ~this.$route.path.indexOf(this.path)
    },
    ActiveStyle(){
      return this.isActive?{color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      if(this.$route.path!=this.path){
        this.$router.push(this.path)
      }
    }
  }
}
</script>

<style scoped>
   .tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    display: flex;
    justify-content:center;
    flex-direction: column
  }
  .tab-bar-item>div>img{
    height: 24px;
    vertical-align: middle;
    object-fit:contain;
  }
</style>