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
/**
 * 
 * @param {Function} fn 
 * @param {Number} interval 
 * 函数节流
 */
export function throttle(fn, interval = 300) {
  let canRun = true; 
  return function () {
    if (!canRun) return;
    canRun = false; 
    setTimeout(() => {
     fn.apply(this, arguments);
      canRun = true;
    }, interval);
  }  
}
  
  