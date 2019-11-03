import { 
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";

export default {
  //payLoad添加新商品
  addCart({state,commit},payload){
    let oldProduct = state.cartList.find(x => x.iid === payload.iid)
    // 判断oldProduct
    if(oldProduct){
      commit(ADD_COUNTER,oldProduct)
    }else{  
      commit(ADD_TO_CART,payload)
    }
  }
}