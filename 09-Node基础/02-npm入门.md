### 1.npm init
`npm init`生成`package.json`;`package.json`有两个作用：
- 1.配置生产环境和开发环境所依赖的文件包
- 2.在`script`里面设置`npm xxx`命令；

### 2.npm install/npm unstall xxx

```js
npm install webpack //在当前项目下安装webpack
npm install webpack -g //全局安装webpack
npm install webpack --save //安装生产环境依赖
npm install webpcak --save-dev //安装生产环境依赖
npm install webpack@3.0.0  //安装指定版本的包
```
**拓展：**
生产环境即项目经过编译打包压缩后用于部署在服务器上的项目文件；开发环境是指开发人员书写的原始代码；
![生产环境&开发环境.png](https://upload-images.jianshu.io/upload_images/3680331-fbe7442b2bbaadf5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
