在es6之前，js声明变量只有一个var命令,但是它存在以下缺点

#### 变量提升
```
console.log(a)  // undefined
var a = 'hello world'
```
```
console.log(a)
let a = 'hello let'
const b = 'hello' 

```
#### 没有块级作用域
```
for(var i=0;i<5;i++){
  setTimeout(function timer(){
  console.log(i);
  },i*1000)
}
```
```
for(let i=0;i<5;i++){
  setTimeout(function timer(){
  console.log(i);
  },i*1000)
}

```
#### 可以重复声明,不报错
```
var a = 1;
var a = 2;

```
#### 无法声明常量
```
var a = 1
    a = 3
console.log(a)
```