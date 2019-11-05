<template>
  <div class="profile" :style="{height:$store.getters.innerHeight}">
    <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>
    <user-info />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './profile/UserInfo'

export default {
  name:"Profile",
  components:{
    NavBar,
    UserInfo
  }
}
</script>

<style scoped>
  .profile{
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>