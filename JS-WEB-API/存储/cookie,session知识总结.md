### cookie
- cookie是存储在浏览器上的一小段数据，用来记录某些当页面关闭或者刷新后仍然需要记录的信息。在控制台用 `「document.cookie」`查看你当前正在浏览的网站的cookie。
- cookie可以使用 js 在浏览器直接设置（用于记录不敏感信息，如用户名）, 也可以在服务端通使用 HTTP 协议规定的 set-cookie 来让浏览器种下cookie，这是最常见的做法。（打开一个网站，清除全部cookie，然后刷新页面，在network的Response headers试试找一找set-cookie吧）
- 每次网络请求 Request headers 中都会带上cookie。所以如果 cookie 太多太大对传输效率会有影响。
- 存储cookie的个数一般不超过50个，单条cookie存储最大容量为4k，所以大量数据不要存到cookie。

**设置cookie时的参数：**
- `name`  cookie的名字
- `expires` cookie的过期时间,也可用来删除cookie
- `path` 设置访问路径,默认为当前文件的路径,一般设置为`.\`
- `domain` 设置访问域名
- `secure`   https下访问
- `httpOnly` 仅允许`http`修改，一般为true;
**URI编码和解码**
- `encodeURIComponent("张三")`
- `deencodeURIComponent(cookie)`
```
document.cookie="name=value;expires=过期时间;path=访问路径;domain=访问域名;secure"
```
**设置7天后删除cookie**
```
let d = new Date();
d.setDate(d.getDate()+10);
document.cookie = "name=;expires=d"
```

path：表示 cookie 影响到的路径，匹配该路径才发送这个 cookie。
expires 和 maxAge：告诉浏览器 cookie 时候过期，maxAge 是 cookie 多久后过期的相对时间。不设置这两个选项时会产生 session cookie，session cookie 是 transient 的，当用户关闭浏览器时，就被清除。一般用来保存 session 的 session_id。
secure：当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效
httpOnly：浏览器不允许脚本操作 document.cookie 去更改 cookie。一般情况下都应该设置这个为 true，这样可以避免被 xss 攻击拿到cookie。
测试： 很多网站的静态资源使用CDN地址而是使用当前网站域名，从cookie的角度说说这对性能有何影响?

### session
当一个用户打开淘宝登录后，刷新浏览器仍然展示登录状态。服务器如何分辨这次发起请求的用户是刚才登录过的用户呢？这里就使用了session保存状态。用户在输入用户名密码提交给服务端，服务端验证通过后会创建一个session用于记录用户的相关信息的对象，这个 session 可保存在服务器内存中（容易产生内存泄露），生产环境一般是保存在数据库中。

创建session后，会把关联的session_id 通过setCookie 添加到http响应头部中。
浏览器在加载页面时发现响应头部有 set-cookie字段，就把这个cookie 种到浏览器指定域名下。
当下次刷新页面时，发送的请求会带上这条cookie， 服务端在接收到后根据这个session_id来识别用户。
cookie 是存储在浏览器里的一小段「数据」，而session是一种让服务器能识别某个用户的「机制」，当然也可以特指服务器存储的 session 数据。session 在实现的过程中需要使用cookie。

### 封装cookie
```
//设置cookie (添加，修改)
function setCookie(name, value, expires){
	var str =  encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if (expires && expires instanceof Date){
		str += "; expires=" + expires;
	}
	
	document.cookie = str; //添加一个cookie
	//console.log(str); 
	//console.log( decodeURIComponent(document.cookie) );
}

//获取cookie
// "name9=李四; name10=王五; name11=赵六"
function getCookie(name){
	var str = decodeURIComponent(document.cookie);
	
	var arr = str.split("; ");
	for (var i=0; i<arr.length; i++) {
		var str2 = arr[i]; //"name9=李四"
		var arr2 = str2.split("=");
		
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return "";
}

//删除cookie
function removeCookie(name){
	var d = new Date();
	d.setDate(d.getDate()-1);
	
	document.cookie = encodeURIComponent(name) + "=; expires=" + d;
}

```