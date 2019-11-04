<template>
  <span @click="myClick"  class="button-count">+</span>
</template>

<script>
export default {
  name:"AddCount",
  methods:{
    myClick(){
      this.$emit('addClick')
    }
  }
}
</script>

<style scoped>

</style>