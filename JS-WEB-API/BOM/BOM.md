> BOM（浏览器对象模型）是浏览器本身的一些信息的设置和获取，例如获取浏览器的宽度、高度，设置让浏览器跳转到哪个地址。

- `navigator`
- `screen`
- `location`
- `history`


**  BOM常用功能代码示例**

- `获取浏览器特性（即俗称的UA）然后识别客户端，例如判断是不是 Chrome 浏览器`
```
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')
console.log(isChrome)
```
- `获取屏幕的宽度和高度`
```
console.log(screen.width)
console.log(screen.height)
```
- `获取网址、协议、path、参数、hash 等`
```
// 例如当前网址是 https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.href)  // https://juejin.im/timeline/frontend?a=10&b=10#some
console.log(location.protocol) // https:
console.log(location.pathname) // /timeline/frontend
console.log(location.search) // ?a=10&b=10
console.log(location.hash) // #some
```
- `另外，还有调用浏览器的前进、后退功能等`
```
history.back()
history.forward()...
```
