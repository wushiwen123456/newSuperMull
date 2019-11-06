<template>
  <div class="profile" :style="{height:$store.getters.innerHeight}">
    <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>
    <user-info />
    <div class="other-infos">
      <div class="user-balance">
        <p><span class="value">{{usersInfo.myOthersInfo.balance | balance}}</span>元</p>
        <p class="key">我的余额</p>
      </div>
      <div class="user-discount">
        <p><span class="value">{{usersInfo.myOthersInfo.discount}}</span>个</p>
        <p class="key">我的优惠</p>
      </div>
      <div class="user-integral">
        <p><span class="value">{{usersInfo.myOthersInfo.integral | integral}}</span>分</p>
        <p class="key">我的积分</p>
      </div>
    </div>
    <list-view :listData="orderList" class="order-view"/>
    <list-view :listData="serviceList" class="service-view"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childComps/UserInfo'
import ListView from './childComps/ListView'

export default {
  name:"Profile",
  components:{
    NavBar,
    UserInfo,
    ListView
  },
  data(){
    return {
      usersInfo:{
        name:'',
        myTel:'',
        myHeadUrl:'',
        myId:'',
        myOthersInfo:{
          balance:0,
          discount:0,
          integral:0,
        }
      },
      orderList:[
        {image:'xinxi.svg',info:'我的消息'},
        {image:'mgshangcheng.svg',info:'积分商城'},
        {image:'huiyuan.svg',info:'会员卡'}
      ],
      serviceList:[
        {image:'gouwuche',info:'我的购物车'},
        {imagae:'Ggooglelogo.svg',info:'下载购物app'}
      ]
    }
  },
  filters:{
    balance(value){
      return value.toFixed(2)
    }
  }
}
</script>

<style scoped>
  .profile{
    position: relative;
    background: #f2f2f2;
    overflow: hidden;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
  .other-infos{
    display: flex;
    font-size: 14px;
    background-color: #fff;
  }
  .other-infos>div{
    flex: 1;
    padding: 15px;  
  }
  .other-infos>div:not(:last-child){
    border-right: 1px solid #f2f2f2 
  }
  .other-infos>div>p{
    text-align: center;
    line-height: 1.8;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .other-infos>div span{
    color: #ff5f3e;
    font-size: 24px;
    font-weight: 600;
    margin-right: 2px;
  }
  .service-view{
    height: 3000px;
    background-color: #fff;
  }
</style>