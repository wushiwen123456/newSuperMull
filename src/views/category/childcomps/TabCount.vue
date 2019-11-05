<template>
  <div class="tab-count" v-if="!!subcategories.length">
    <div v-for="(item,index) in subcategories" :key="index">
      <a :href="item.link" class="item-link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabCount",
  props:{
    subcategories:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {

    }
  },
  computed:{
  }
}
</script>

<style scoped>
  .tab-count{
    padding: 20px 8px;
    display: grid;
    grid-template-columns:repeat(3,1fr);
    grid-gap: 10px;
    text-align: center;
  }
  .tab-count>.item-link{
    display: block;
    font-size: 16px;
  }
  .item-link>img{
    width: 100%;
  }
  
</style>