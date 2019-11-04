<template>
  <span class="button-count" @click="myClick">+</span>
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