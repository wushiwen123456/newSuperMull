<template>
  <div class="comment" v-if="Object.keys(commontInfo).length">
    <div class="title">
        <div>用户评价</div>
        <div>
          更多<i class="arrow-right"></i>
        </div>
    </div>
    <div class="user-info">
      <div class="user-title">
        <img :src="commontInfo.user.avatar" alt="">
        <span>{{commontInfo.user.uname}}</span>
      </div>
      <div class="user-main">
        <p class="content">{{commontInfo.content}}</p>
        <p class="style">{{commontInfo.style}}</p>
      </div>
      <div v-if="commontInfo.images" class="user-image">
        <img v-for="(item,index) in commontInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name:"DetailCommentInfo",
  props:{
    commontInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    data(){
      return {
       isCommontUser:false
      }
    },
    mounted(){
      this.isCommontUser = true
    }
  },
}
</script>

<style scoped>
  .comment{
    padding: 5px 12px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .title{
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .user-title{
    padding: 10px 0 5px;
  }
  .user-title>img{
    width: 42px;
    height: 42px;
    border-radius: 50%
  }
  .user-title>span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
    color: #2b2b2b;
  }
  .content{
    font-size: 14px;
    color: #777;
  }
  .style{
    color: #999;
    font-size: 12px;
  }
  .user-image{
    margin-top: 10px;
  }
  .user-image>img{
    width: 70px;
    height:70px;
    margin-right: 5px;
  }
</style>