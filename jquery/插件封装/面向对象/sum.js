~function(){
  
var Sum = function(opts){
  // 设置默认值
  this.options = {
    x:1,
    y:2,
    z:3
  }
  // 使用for循环，设置默认参数
  for( key in this.options){
    console.log(key);
    if(opts[key] !==undefined){
       this.options[key] = opts[key];
    }
  }
  // 设置默认参数
  Sum.prototype.add = function(){
    var sum = 0;
    for( key in this.options) {
      sum+=this.options[key];
    }
    return sum();
  } 

}
}()
