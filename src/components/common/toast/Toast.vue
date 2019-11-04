<template>
  <div class="toast" v-show="isShow">
    <div class="message">
      {{message}}
    </div>
  </div>
</template>

<script>
export default {
  name:"Toast",
  data(){
    return {
      isShow:false,
      message:"哈哈哈"
    }
  },
  methods:{
    show(message="默认文字",duration = 700){
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
      }, duration);
    }
  }

}
</script>

<style scoped>
  .message{
    padding: 5px 10px;
    border-radius: 5px;
    background: rgba(0,0,0,.8);
  }
  .toast{
    position: fixed;
    left:0;
    top:0;
    z-index: 999;
    width: 100vw;
    height:calc(100vh - 49px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
  }
</style>