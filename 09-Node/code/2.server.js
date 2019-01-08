const http = require("http")

let server = http.createServer((req,res)=>{
  console.log("有人执行我了")
  // req接受的数据
  // res发出的数据
  res.write("res message")
  // 显示结束 
  res.end()

})

server.listen(8080)


// 一个服务器就像一个大楼，里面有很多住户(端口号)
