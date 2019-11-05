export default {
  cartLength(state){
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  innerHeight(state){
    return window.innerHeight + 'px'
  }
}