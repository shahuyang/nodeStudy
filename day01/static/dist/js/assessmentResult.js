//声明全局对象
var config= {
    userId:'33',
    data:{},
    sign:'',
    timeStamp:'',
    result:''
};

var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");


config.result = GetUrlParam('resultType');
$('#assessment_result').html(config.result);


//假设 本产品风险等级为 中，当 风险测评为 XX 时。显示为不符合
if(config.result == '保守型'){
    //不符合的情况
    $('<img src="images/icon_notAccord.png">本产品的风险等级为<i class="red"> 中 </i>，不符合你的风险承担能力。').appendTo($('#ar_promptResult'));
    $('#again_test').css({display:'block'});
    $('#again_test').on('click',function(){
        //清除答题记录跳转至 测评页面
        location.href = 'http://localhost/appserver-web/static/templates/riskAssessment.html?clearRecord=1'
    })
//    不符合情况下，我去逛逛跳转至  某页面
    $('#ar_mainBtn').html('我已了解，去逛逛').attr('href','target url')
}else{
    //符合的情况
    $('<img src="../dist/images/icon_accord.png">本产品的风险等级为<i class="green"> 中 </i>，符合你的风险承担能力。').appendTo($('#ar_promptResult'));
    //    符合情况下，马上买入跳转至 当前产品买入页面
    $('#ar_mainBtn').html('我已了解，马上买入').attr('href','target url');
}







