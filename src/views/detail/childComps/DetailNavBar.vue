<template>
  <div>
    <nav-bar>
      <div slot="left" 
            class="back"
            @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="index" 
              class="title-item" 
              :class="{active:index == currentIndex}"
              @click="itemClick(index)">
              {{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:"DetailNavBar",
  props:{
    detailIndex:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  components:{
    NavBar,
    currentIndex:0
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
    }
  },
  methods:{
    itemClick(index){
      this.$emit('navBarClick',index)
    },
    backClick(){
      this.$router.back()
    }
  },
  computed:{
    currentIndex(){
      return this.detailIndex
    }
  }  
}

</script>

<style scoped>
  .title{
    display: flex;

  }
  .title-item{
    flex: 1;
  }
  .active{
    color:var(--color-high-text)
  }
  .back{
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>