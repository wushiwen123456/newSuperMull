<template>
  <div class="list-view">
    <div v-for="(item,index) in listData" :key="index" class="list-item">

      <img src="~assets/img/profile/xinxi.svg" alt=""  class="item-icon">
      <div class="item-info">
        {{item.info}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"ListView",
  props:{
    listData:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .list-item{
    height: 40px;
    line-height: 40px;
    position: relative;
    padding-left: 35px;
  }
  .item-icon{
    position: absolute;
    left: 2%;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height:20px;
  }
  .item-info{
    border-bottom: 1px solid #f2f2f2;

  }
  .list-view{
    background: #fff;
    margin-top: 20px;
  }
</style>