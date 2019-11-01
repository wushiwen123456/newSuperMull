<template>
  <div class="param" v-if="Object.keys(paramInfo).length">
    <div v-for="(sizes_list,index1) in paramInfo.sizes" :key="'paramSize-'+index1" class="param-box">
      <ul v-for="(sizes_type,index2) in sizes_list" :key="index2" class="param-ul">
        <li v-for="(sizes_item,index3) in sizes_type" :key="index3" class="param-li">{{sizes_item}}</li>
      </ul>
    </div>
    <div v-for="(item,index) in paramInfo.infos" :key="'paramInfo-'+index" class="param-info">
      <div class="param-info-key">{{item.key}}</div>
      <div class="param-info-value">{{item.value}}</div>
    </div>
    <div v-if="!!paramInfo.image">
      <img src="paramInfo.image" alt="">
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

<style scoped>
.param{
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.param-ul{
  display: flex;
  list-style: none;
}
.param-li{
  flex: 1;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.param-info{
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.param-info-key{
  width: 30%;
}
.param-info-value{
  width: 70%;
  color: #eb4868;
}
</style>