**Date Api整理**

**Date时间格式化**
```js
	function format(){
		const time = new Date();
		const year = time.getFullYear();
		let m = time.getMonth()+1;
		let month = Zero(m);
		let d = time.getDate();
		let day = Zero(d);
		const w = time.getDay();
		var str = "日一二三四五六",week = str.charAt(w);
		const hour = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		return `${year}年${month}月${day}日 周${week} ${hour}点${minutes}分${seconds}秒`
	}
         // 补零函数
	function Zero(value){
		return value<10?"0"+value:value;
	}

	const localTime = format();
	console.log(localTime)

```
**Date常用之获取两个时间的差值**
```js
function getSpanTime() {
			const nowTime = new Date();
			const targetTime = new Date("2018/7/12 23:59:59");
          //此处不能用“—”，因为ie6-8存在兼容性问题
			const nowSpan = nowTime.getTime();
                        // 此处也可以用Date.now() 获取和1997年之间的毫秒差
			const tarSpan = targetTime.getTime();
			const elapsed = tarSpan - nowSpan;
			// console.log(elapsed)
			const hours = Math.floor(elapsed/(1000*60*60));
			let diffTime = elapsed - hours*1000*60*60;
			const minutes = Math.floor(diffTime/(1000*60));
			diffTime -= minutes*1000*60;
			const seconds = Math.floor(diffTime/1000);
			return Zero(hours)+"时"+Zero(minutes)+"分"+Zero(seconds)+"秒"
		}

```
**Date时间字符串**
```
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

```
**多长时间之前**
```
export function friendlyTime(dateStr) {
  const dateObj = typeof dateStr === 'object' ? dataStr : (new Date(dateStr));
  const space = Date.now() - dateObj.getTime();
  let str = '';
  switch (true) {
    case space < 60000:
      str = '刚刚'
      break;
    case space < 3600000:
      str = Math.floor(space / 60000) + '分钟前';
      break
    case space < 3600000 * 24:
      str = Math.floor(space / 3600000) + '小时前';
      break
    case space < 3600000 * 24 * 30:
      str = Math.floor(space / (3600000 * 24)) + '天前';
      break
    case space < 3600000 * 24 * 30 * 12:
      str = Math.floor(space / (3600000 * 24 * 30)) + '月前';
      break
      // 超过一年，默认显示日期
    default:
       str = dateObj.getFullyear()+"年"+dateObj.getMonth()+'月'+dateObj.getDate()+'日'
  }
  return str

}

```
