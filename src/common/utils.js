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
/**
 * 
 * @param {时间戳} date 
 * @param {格式：yyyy-MM-dd hh:mm:ss}} fmt 
 * 时间戳格式化函数
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};





