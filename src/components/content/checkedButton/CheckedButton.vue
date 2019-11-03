<template>
  <div class="checked" :class="{c_checked:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name:"CheckedButton",
  props:{
    isChecked:{
      type:Boolean,
      default(){
        return true
      }
    }
  }
}
</script>

<style>
  .checked{
    position: absolute;
    left: 2%;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #aaa
  }
  .checked>img{
    width: 100%;
    height: 100%;
    object-fit: contain
  }
  .c_checked{
    border-color: var(--color-high-text);
    background-color: var(--color-high-text);
  }
</style>