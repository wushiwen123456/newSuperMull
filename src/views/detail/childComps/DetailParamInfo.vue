<template>
  <div class="param">
    <div v-for="(sizes_list,index1) in paramInfo.sizes" :key="index1" class="param-box">
      <ul v-for="(sizes_type,index2) in sizes_list" :key="index2" class="param-ul">
        <li v-for="(sizes_item,index3) in sizes_type" :key="index3" class="param-li">{{sizes_item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailParamInfo",
  props:{
    paramInfo:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style>
.param{
  padding: 20px 0 10px;
}
</style>