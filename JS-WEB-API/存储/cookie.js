//设置cookie (添加，修改)
function setCookie(name, value, expires){
	var str =  encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if (expires && expires instanceof Date){
		str += "; expires=" + expires;
	}
	
	document.cookie = str; //添加一个cookie
	//console.log(str); 
	//console.log( decodeURIComponent(document.cookie) );
}

//获取cookie
// "name9=李四; name10=王五; name11=赵六"
function getCookie(name){
	var str = decodeURIComponent(document.cookie);
	
	var arr = str.split("; ");
	for (var i=0; i<arr.length; i++) {
		var str2 = arr[i]; //"name9=李四"
		var arr2 = str2.split("=");
		
		if (arr2[0] == name) {
			return arr2[1];
		}
	}
	return "";
}

//删除cookie
function removeCookie(name){
	var d = new Date();
	d.setDate(d.getDate()-1);
	
	document.cookie = encodeURIComponent(name) + "=; expires=" + d;
}