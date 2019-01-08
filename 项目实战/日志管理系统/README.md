## 日志管理系统项目总结

### 项目介绍
这个项目是进万维后的第一个项目，它是基于DRBD构建的日志文件管理系统，包含日志源管理，日志文件管理，策略管理，存储空间管理、用户及系统管理模块。

### 技术栈
前端：Vue＋axios+ElementUi+echarts

### 目录结构
```js
|-- build  // webpack相关配置
|-- config // 配置相关
|-- dist   // 打包好的源代码
|-- node_modules // 相关模块
|-- src
|   |-- apis // 请求接口
|   |-- assets //图标，字体等静态资源
|   |-- components // 全局公用组件
|   |-- store // vuex容器
|   |-- styles // ele样式初始化等样式文件
|   |-- utils // 相关方法库
|   |-- views // 各模组组件
|   |-- app.vue // 入口文件
|   |-- main.js // 入口，加载组件
|-- static
|   |-- favicon.ico // ico图标需要放置在此处
|-- .babelrc
|-- .editorconfig
|-- .gitgnore
|-- .postcssrc.js
|--  index.html
|-- package-lock.json
|-- package.json
|-- README.md


```
### api和views
根据业务模块来划分 views，并且 将views 和 api 两个模块一一对应，从而方便维护.
### components
components放置的都是全局公用的一些组件，如layout布局，404page，面包屑等

### 封装axios
```
// 1.引入axios
import axios from 'axios';
// 引入elementui消息组件
import { Message } from 'element-ui'
import route from '@/router'
import {BASE_URL} from '../apis/config.data'

// 2.配置默认值
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = false;
axios.defaults.timeout = 5000;

// 3.请求拦截器
axios.interceptors.request.use(
  config => {
    // 从本地获取token,并在请求头中设置token
    const token = localStorage.getItem('XD_TOKEN')
    if (token) {
      config.headers.common['xd_token'] = token;
    }
    return config;
  },
  error => {
    console.log(err) // for debug
    return Promise.reject(error);
  }
);
// 4.响应拦截器
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      Message.error(error.response.data.data[0]);
      route.push('/login');
    } else {
      Message.error('系统错误');
    }
    return Promise.reject(error);
  }
);

// 5.对axios进行二次封装
export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
  //配置参数对象
    let option = {
      url,
      method: type,
      validateStatus: function (status) {
        return (status >= 200 && status < 300) || status === 400;
      },
    };
// 对get和post请求传递的数据进行区分
    type.toLowerCase() === 'get'?(option.params=data):(option.data = data);
// axios核心，发送请求
    axios(option).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(err => {
      reject({ msg: '网络异常' })
    })
  })
}

```
