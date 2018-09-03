### JavaScript的组成
JavaScript基础分为三个部分：
- ECMAScript：JavaScript的语法标准。包括变量、表达式、运算符、函数、if语句、for语句等。
- BOM：浏览器对象模型，操作浏览器部分功能的API。比如让浏览器自动滚动。
- DOM：文档对象模型，操作网页上的元素的API。比如让盒子移动、变色、轮播图等。
### 什么是DOM？
要理解DOM,首先要了解HTML,要了解HTML，首先要理解XML。XML即可扩展的标记语言。所谓可扩展就是能够描述任何结构化的数据。
```xml
<note>
<to>Tove</to> 
<from>Jani</from> 
<heading>Reminder</heading> 
<body>Don't forget me this weekend!</body>
<other>
    <a></a>
    <b></b>
</other>
</note>
```
HTML是一套有既定标签的XML,标签的名字，层次关系和属性都被标准化(否则浏览器无法解析)，它也是一棵树。
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div>
        <p>this is p</p>
    </div>
</body>
</html>
```
我们开发完成的文件最终被保存成(以`html`或者`xml`)结尾的文档，上传到服务器上，浏览器向服务器发送请求，浏览器把`html`文件返回，也就是浏览器最终得到的就是`html`格式的代码。

但是，浏览器要把这个`html`格式的代码，渲染成页面，需要转化成自己能够识别的格式，也需要转换成js能够识别和处理的格式，基于以上需求，最终转换成DOM。

对于DOM的理解，我们可以暂时抛开浏览器层面,从js方面入手，可以认为DOM就是js能够识别的`html`结构，是一个js对象或者数组。
### 节点类型
- 文本节点 3
- 注释节点 8
- 属性节点 
- 元素节点 1

### DOM API
 DOM提供了一套允许js对页面进行控制的api
**获取DOM节点**
```
// 通过 id 获取
var div1 = document.getElementById('div1') // 元素

// 通过 tagname 获取
var divList = document.getElementsByTagName('div')  // 集合
console.log(divList.length)
console.log(divList[0])

// 通过 class 获取
var containerList = document.getElementsByClassName('container') // 集合

// 通过 CSS 选择器获取
var pList = document.querySelectorAll('p') // 集合...

```
**新建DOM节点**
```
var p  =document.createElement("p");
p.innerHTML = "this is a p Element"

创建文档碎片
var tempElement = document.createDocumentFragment
```
**末尾追加和插入**
```
// 末尾添加
oDiv.appendChild(newElement);
// 向某一个子元素之前插入
oDiv.insertBefore(newElement,oldElement)

```
**获取子元素**
```
oDiv.children() // 只获取元素类型为1
oDiv.childNode() //获取所有节点
```
**获取父元素**
```
oDiv.parentNode
````
**获取兄弟节点|元素**
`firstChild`,`lastChild`,`previousSibing`,`nextSibling`

*以上兄弟属性获取到的是兄弟节点，如果要获取兄弟元素，则使用* `firstElementChild,lastElementChild,previousElementSibling,nextElementSibling`

###属性
> 题目：property 和 attribute 的区别是什么？

- `prototype`和`attribute`都可以对DOM属性进行控制，改变页面的显示
- 但是prototype只能改变页面的显示，但是无法改变html文档里面的内容，当页面关系后，便消失了。
拓展链接: https://www.web-tinker.com/article/20115.html

**属性相关api**
```js
getAttribute()
setAttribute()
removeAttribute()
```



