<template>
  <div class="user-info">
    <div class="user-icon">
      <slot name="user-icon">
        <img src="~assets/img/profile/user-icon.svg" alt="">
      </slot>
    </div>
    <div>
      <slot name="user-info">
          <p>登录/注册</p>
          <div><img src="" alt="">暂无绑定手机号</div>
      </slot>
    </div>
    <div class="user-arrow">
      <slot name="user-arrow">
        <div class="arrow-right"></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"UserInfo"
}
</script>

<style scoped>
  .user-info{
    padding: 15px;
    background-color: var(--color-tint);
    color: #fff;
    display: flex;
    align-items: center;
    position: relative;
  }
  .user-icon{
    width: 60px;
    height: 60px;
    margin-right: 20px;
  }
  .user-icon>img{
    width: 100%;
  }
  .user-arrow>.arrow-right{
    border-color: #fff;
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%) rotate(135deg);
  }
</style>