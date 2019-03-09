// http
// assert
// Buffer
// File.system
const fs = require("fs")
fs.readFile("1.txt",(err,data)=>{
  console.log(err)  //null
  if(err){
    console.log(err)
  }else{
    console.log(data)  //文本可以data.toString()
  }
})
fs.writeFile("2.txt","dasdadasdasd",err=>{
  if(err){
    console.log(err)
  }else{
    console.log('ok')
  }
})

const crypto = require("crypto")

let obj = crypto.createHash("md5") //md5 sha1

obj.update("123")
obj.update("4")
obj.update("56")

console.log(obj.digest('hex')) //以16进制输出





