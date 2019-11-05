module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗宽度，对应设计稿的宽度，
      viewportHeight:667,//视窗高度，对应设计稿的高度(也可以不配置)
      unitPrecision:5,//指定px转成相应单位的最大小数位数(很多时候无法整除)
      vieportUnit:'vw',//指定需要转换成的视窗单位，推荐vw
      selectorBlackList:['ignore','tab-bar','tab-bar-item','content','nav-bar','tab-control-item','tab-control1'
                          ,'bottom-bar'],//指定不需要转换的类
      minPixelValue:1, //小于1px不进行转换
      mediaQuery:false, //允许在媒体查询中转换px
      exclude:[/^TabBar/,/DetailBottomBar/]//以TabBar开头的文件不进行转换
    }
  }
}
