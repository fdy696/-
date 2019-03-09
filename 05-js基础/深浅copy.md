### 浅copy
```
let arr1 = [1,2,3]
let arr2 = arr1;
arr2.push(4)
arr1 // [1,2,3,4]
```
### 复制一层的copy
```
let arr2 = arr1.concat([])  //只适用于非josn数组
```