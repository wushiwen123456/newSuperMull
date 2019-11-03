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
        <div class="style"><span>{{commontInfo.created | showDate}}</span><span>{{commontInfo.style}}</span></div>
        
      </div>
      <div v-if="commontInfo.images" class="user-image">
        <img v-for="(item,index) in commontInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
  <div v-else class="info-null">
    还没有人评论呢，快来抢沙发把~~
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name:"DetailCommentInfo",
  props:{
    commontInfo:{
      type:Object,
      default(){
        return {}
      }
    }  
  },
  filters:{
      showDate(value){
        // 将时间戳转换成date对象
        const date = new Date(value * 1000)

        // 将date格式化
        return formatDate(date,'yyyy-MM-dd')
      }
  }
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
  .style>span{
    margin-right: 20px;
  }
  .user-image{
    margin-top: 10px;
  }
  .user-image>img{
    width: 70px;
    height:70px;
    margin-right: 5px;
  }
  .info-null{
    text-align: center;
    line-height: 100px;
    padding-bottom: 15px;
    font-size: 1rem;
    border-bottom: 5px solid #f2f5f8;
  }
</style>