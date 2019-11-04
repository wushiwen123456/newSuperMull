<template>
  <span @click="myClick" class="button-count">{{str}}</span>
</template>

<script>
export default {
  name:"Count",
  props:{
    str:{
      type:String,
      default:'+'
    }
  },
  methods:{
    myClick(){
      this.$emit('countClick')
    }
  }
}
</script>

<style scoped>
  .button-count{
    padding: 2px 8px;
    border: 1px solid var(--color-text);
    border-radius: 4px;
    margin: 0 3px;
  }
</style>