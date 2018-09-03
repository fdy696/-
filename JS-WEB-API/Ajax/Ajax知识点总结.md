Ajax:异步的JavaScript和XML，它能够让浏览器在不刷新页面的情况下向服务器发送HTTP请求,获得数据。
### Ajax实例
*拟人化的Ajax四步*
- `打开浏览器`
- `在地址栏输入地址`
- `摁下回车`
- `等待服务器返回数据`
```
  <button>请求数据</button>
  <ul></ul>
```
js
```
  oBtn = document.querySelector("button");
  oUl = document.querySelector("ul");
  


// 发送请求
function $ajax(fn){
    // 创建xhr对象
  const xhr = new XMLHttpRequest();
// 设置初始值
  xhr.open('POST',"https://www.easy-mock.com/mock/5b814f26e8258338ac712614/myApi/post",true);
// 发送请求
    xhr.send(null);
    xhr.onreadystatechange= function(){
      if(xhr.readyState===4){
      var value = xhr.responseText;
      var arr = JSON.parse(value);
      fn(arr);

      }
    }
}

function addEle(arr){
  arr.forEach(a=>{
    var liEle = document.createElement("li");
    liEle.innerHTML = a.title;
    oUl.appendChild(liEle);
  })
}
oBtn.onclick = function(){
    $ajax(addEle)
}

```
### xhr对象及其兼容性处理
Ajax的核心的浏览器提供的`XMLHTTPRequest`对象,但是该对象在IE6及一下不存在；
```
var xhr = window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
```
### open和表单
```
<form action="1.php" method="post" enctype="application/x-www-form-urlencoded">

</form>

```
表单中一般设置以上三个属性
- `method`
以何种方式对资源进行操作(HTTP vebs)  `http vebs`
  - GET 请求
  - POST 获取
  - DELETE 删除
  - PUT 整体替换
  - PATCH 局部替换
- `action`
数据提交的地址
- `enctype` 使用何种enctype解析数据
> get和post的区别？
- 传参方式，一个使用url，一个使用请求头
- url长度有限制，超过200字符会裁剪；post理论没有限制，但是后端会设置
- 安全性问题的争议；get方式只能传递字符串
### Ajax请求状态以及Http响应状态
Ajax请求状态 —— readyState
|值   |状态  |描述   | 
| - |:-:|:-:|
|0|UNSENT|open方法还未被调用|
|1|OPENED|open方法已经被调用|
|2|Headers_receive|send()方法已经被调用，相应头和响应状态已经返回|
|3|Loading(正在下载响应体)|响应体下载中，responseTexe中已经获得部分数据|
|4|DONE|整个请求过程已经完毕|

Http状态 ——status 描述了服务器响应内容的状态
`1xx`表示信息,记录客户端的某些行为
`2xx`表示成功返回 `/^2\d{2}$/.test(xhr.status)`
`3xx`
301 永久重定向
302 临时重定向，服务器负载均衡
304 从缓存中获取的数据

`4xx` 客户端错误
400 向服务器传递的参数错误 
401 没有访问权限
404 客户端访问的地址错误

`5xx`
500 服务器错误
503  服务器超负荷

### 封装Ajax库
```
/** 全局ajax对象 */
var ajax = new Object();
var ajaxCore = null;

/**
 * @see 创建ajax核心对象,兼容浏览器有：IE6,7,8,9，谷歌，火狐，欧朋，360极速，360安全，苹果，搜狗，遨游，猎豹，腾讯
 * @return XMLHttpRequest
 */
ajax.getCore = function() {
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
        if (xmlHttp.overrideMimeType) {
            xmlHttp.overrideMimeType("text/xml");
        }
    } else {
        if (window.ActiveXObject) {
            try {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
    }
    if (!xmlHttp) {
        window.alert("\u8bf7\u4f7f\u7528IE\u6d4f\u89c8\u5668!");
    }
    return xmlHttp;
};

/**
 * @see 处理ajax参数
 * @param param 参数
 * @return String
 */
ajax.getParam = function(param) {
    var randomStr = "ajaxParamRandom=" + Math.random();
    if (param == null || param == "") {
        return randomStr;
    }
    var str = "";   
    if (typeof(param) == "object") {
        for (var key in param) {
            str += key + "=" + param[key] + "&";
        }
        str = (str.length > 0 ? str.substring(0, str.length - 1) : str);
    } else {
        str = param;
    }
    return str + "&" + randomStr;
};

/**
 * @see ajax的回调函数
 * @param callback 用户自定义回调函数
 * @param url 请求的url
 */
ajax.doCallback = function(callback, url) {
    if (ajaxCore.readyState == 4) {
        if (ajaxCore.status == 200) {
            if (callback == null) {
                return;
            }
            var result = new String(ajaxCore.responseText);
            if (null != result && result != "") {
                if (result == "null") {
                    callback(null);
                } else {
                    var backObject = null;
                    if (result == "true" || result == "false") {
                        backObject = eval(result);
                    } else if (!isNaN(result)) {
                        backObject = parseFloat(result);
                    } else if ((result.substring(0, 1) == "[" && result.substring(result.length - 1, result.length) == "]") || 
                            (result.substring(0, 1) == "{" && result.substring(result.length - 1, result.length) == "}")) {
                        backObject = eval("(" + result + ")");
                    } else {
                        backObject = result;
                    }
                    callback(backObject);
                }
            } else {
                callback(result);
            }           
        } else if (ajaxCore.status == 0 || ajaxCore.status == 12029) {
            showProgress("0", "1");
            alertWin("\u627e\u4e0d\u5230\u670d\u52a1\u5668\uff01", null, "");
        } else if (ajaxCore.status == 404) {
            showProgress("0", "1");
            alertWin("\u627e\u4e0d\u5230\u8d44\u6e90: " + url, null, "");
        }
    }
};

/**
 * @see ajax的post请求
 * @param url 请求的url
 * @param param 参数列表，可以是字符串或js对象或null
 * @param callback 用户自定义回调函数
 */
ajax.post = function(url, param, callback) {
    ajaxCore = ajax.getCore();
    if (ajaxCore != null) {
        ajaxCore.onreadystatechange = function() {
            ajax.doCallback(callback, url);
        };
        ajaxCore.open("POST", url, true);
        ajaxCore.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajaxCore.send(ajax.getParam(param));
    }
};

/**
 * @see ajax的get请求
 * @param url 请求的url
 * @param callback 用户自定义回调函数
 */
ajax.get = function(url, callback) {
    ajaxCore = ajax.getCore();
    if (ajaxCore != null) {
        if (url.indexOf("?") != -1) {
            url += "&ajaxParamRandom=" + Math.random();
        } else {
            url += "?ajaxParamRandom=" + Math.random();
        }alert(url);
        ajaxCore.onreadystatechange = function() {
            ajax.doCallback(callback, url);
        };
        ajaxCore.open("GET", url, true);
        ajaxCore.send(null);
    }
};

```