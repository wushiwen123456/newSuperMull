<template>
  <span class="button-count" @click="myClick">-</span>
</template>

<script>
export default {
  name:"SubCount",
  methods:{
    myClick(){
      this.$emit('subClick')
    }
  }
}
</script>

<style scoped>

</style>