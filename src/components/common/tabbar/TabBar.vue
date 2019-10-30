<template>
  <div class="tab-bar">
    <slot></slot>   
  </div>
</template>

<script>
export default {
  name:"TabBar"
}
</script>

<style scoped>
   .tab-bar{
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    z-index: 999;
    height: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow:0 -3px 7px rgba(0, 0, 0, .5) 
  }
 
</style>