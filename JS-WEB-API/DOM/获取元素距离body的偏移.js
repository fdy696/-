function offset(curEle){
  var allTop = null,allLeft = null,curParent = curEle.offsetParent;

  while(curParent){
    <!-- //获取自身的偏移 -->
    var top = curEle.offsetLeft;
    var left = curEle.offsetTop;

    allTop+=top;
    allLeft+=left;

    <!-- //对IE8浏览器进行处理，不让他在加父级边框； -->
    if(navigator.userAgent.indexOf("MSIE 8.0")===-1){

    <!-- //获取父级的边框 -->
    curParentLborder = curParent.clientLeft;
    curParentTborder = curParent.clientTop;

    allLeft+=curParentLborder;
    allTop+=curParentTborder;
    
    }


  <!-- 	//获取父级的偏移 -->
    var pLeft = curParent.offsetLeft;
    var pTop = curParent.offsetTop;

    allLeft+=pLeft;
    allTop+=pTop;

    curParent = curParent.offsetParent;

  }

  return {top:allTop,left:allLeft}
},