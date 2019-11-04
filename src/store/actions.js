import { 
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types";
import { resolve } from "url";
import { reject } from "q";

export default {
  //payLoad添加新商品
  addCart({state,commit},payload){
    return new Promise((resolve,reject) => {
      let oldProduct = state.cartList.find(x => x.iid === payload.iid)
      // 判断oldProduct
      if(oldProduct){
        commit(ADD_COUNTER,oldProduct)
        
        resolve('商品数量+1')
      }else{
        commit(ADD_TO_CART,payload)
        resolve('添加商品到购物车')
      }
    })
  }
}