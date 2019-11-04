<template>
  <div class="bottom-bar">
    <div class="check-all" @click="checkedClick" >
      <checked-button :is-checked="isSellectAll" />
      <span>全选</span>
    </div>
    <div class="remote" v-show="listCount" @click="remove">
      删 除({{listCount}})
    </div>
  </div>
</template>

<script>
import CheckedButton from 'components/content/checkedButton/CheckedButton'
import { mapGetters } from 'vuex'
export default {
  name:"Edit",
  components:{
    CheckedButton
  },
  data(){
    return {
      clickList:[]
    }
  },
  computed:{
    ...mapGetters({
      list:'cartList'
    }),
    listCount(){
      return this.list.filter(item => item.checked).length
    },
    isSellectAll(){
      return !!this.list.length && this.list.every(item => item.checked)
    }
  },
  methods:{
    checkedClick(){
      if(this.isSellectAll){
        this.list.forEach(x => x.checked = false)
      }else{
        this.list.forEach(x => x.checked = true)
      }
    },
    remove(){
      for (let i = this.list.length - 1; i >= 0; i--){
        if(this.list[i].checked) this.list.splice(i,1)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 55px;
    background-color: #eee;
    position: absolute;
    left: 0;
    bottom: 49px;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 35px;
  }
  .check-all{
    width: 10vw;
    display: flex;
    align-items: center
  }
  .remote{
    height: 100%;
    padding:0 20px;
    box-sizing: border-box;
    background-color: rgba(255, 51, 0,1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
  }
</style>