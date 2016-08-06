var C = function(){
	for(var i=0;i<arguments.length;i++){
		console.log(arguments[i])
	}
};
function getStyle(obj, name) {
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj, false)[name];
	}
};

//手机平台判断
function systemJudge (){
	if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
		var version = parseFloat(RegExp.$1);
		return 'Android '+version;
	}else if(navigator.userAgent.indexOf('iPhone') != -1){
		return 'IOS';
	}else{
		return '非IOS非Android';
	}
}
//获取窗口高宽
function getInnerHeight() {
	if (window.innerHeight) {
		return window.innerHeight;
	} else {
		return Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	}
}
function getInnerWidth() {
	if (window.innerWidth) {
		return window.innerWidth;
	} else {
		return Math.min(document.body.clientWidth, document.documentElement.clientWidth);
	}
}
//获取文档高
function getScrollHeight(){
	return $(document.body).height();
}
//获取当前位置距离顶部高度
function getScrollTop(){
	if (document.documentElement.scrollTop){
		return document.documentElement.scrollTop
	}else{
		return document.body.scrollTop
	}
}

// 时间戳 解析为 xxxx-xx-xx 表示
function dateStringify(dateStr,accuracy){
	var date = new Date(parseInt(dateStr));
	Y = date.getFullYear() + '-';
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	D = date.getDate() <10 ? '0' + date.getDate():date.getDate()+ ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds();
	if(accuracy == 1){
		return Y+M+D+h+m+s;
	}else if(accuracy == 2){
		return M+D;
	}else{
		return Y+M+D;
	}
};

// 当前时间表示 解析为 时间戳
function dateParseStr(){
	var date = new Date();
	return date.getTime();
}
// 其他时间表示 解析为 时间戳
function dateParse(dateStr){
	var date = new Date(dateStr);
	return date.getTime();
}
//  返回 当前时间 到 截止时间的  剩余毫秒数
function dateSurplus (dateEnd,dateStart){
	var dateEnd = new Date(dateEnd),
		dateStart = dateStart? new Date(dateStart):new Date();
	return (dateEnd-dateStart);
}
//当前时间截止到当日凌晨剩余毫秒数
function todaySurplus(){
	var date = new Date();
	return ((23-date.getHours())*3600+(59-date.getMinutes())*60+(60-date.getSeconds()))*1000
}
//当前时间截止到第二天 上午 9点 剩余毫秒数
function todaySurNine(){
	var date = new Date();
	var todaySurplus = ((23-date.getHours())*3600+(59-date.getMinutes())*60+(60-date.getSeconds()))*1000;
	return todaySurplus + 1000*3600*9;
}


//URL截取参数
function GetUrlParam(paraName) {
	var url = document.location.toString();
	var arrObj = url.split("?");
	if (arrObj.length > 1) {
		var arrPara = arrObj[1].split("&");
		var arr;
		for (var i = 0; i < arrPara.length; i++) {
			arr = arrPara[i].split("=");
			if (arr != null && arr[0] == paraName) {
				return decodeURI(arr[1]);
			}
		}
		return "";
	}
	else {
		return "";
	}
}

// 错误正确提示
var prompt = function($obj,txt,boolean){
	$obj.html(txt);
	if(boolean){
		$obj.css('bottom','2.875rem');
	}else{
		$obj.css('top','2.875rem');
	}
	$obj.css('opacity','1');
	$obj.animate({
		opacity:0
	},1000)
};
//
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

// 变色函数
//  给所有需要变色的 元素 加  js_color
//  red green 泛指所有与涨跌有关的函数
var  changeColor=function(){
	var	aEle = document.getElementsByClassName('js_color');
	if(aEle.length!==0){
		for(var i=0;i<aEle.length;i++){
			var curValue = parseFloat(aEle[i].innerHTML);
			if(curValue>0){
				aEle[i].className = 'js_color red'
			}else if(curValue<0){
				aEle[i].className = 'js_color green'
			}

		}
	}
};

// 风险级别函数
var  changeLevel=function(){
	var	aEle = document.getElementsByClassName('js_level');
	if(aEle.length!==0){
		for(var i=0;i<aEle.length;i++){
			var curValue = aEle[i].innerHTML;
			if(curValue == '高风险'){
				$(aEle[i]).siblings('span').addClass('level_h')
			}else if(curValue == '低风险'){
				$(aEle[i]).siblings('span').addClass('level_l')
			}

		}
	}
};







