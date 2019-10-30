/**
 * 函数防抖
 * @param {function} func 
 * @param {number} delay 
 */
export function debounce(func,delay){
  let timer = null;
  return (...args) => {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this,args)
     
    },delay)
  }
}