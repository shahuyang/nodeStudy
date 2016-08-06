//声明全局对象
var config= {
	userId:'',
    productId:'32',
    data:{},
    storage:[],
    todaySurplus:''
};
// md5 加密
var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");

//产品基本信息回调
var callbackEbtProduct = function(){
    //   头部内容填充
    $('#fdl_title h4').html(config.data.ebtProduct.productType);
    $('#fdl_title h5').html(config.data.ebtProduct.providerName);
    $('#fdl_title .fdl_profit span').html(config.data.ebtProduct.returnRate);
    //  理财期限
    $('#lockTerm').html('锁定期'+config.data.ebtProduct.lockTerm+'天');
    $('#lockStart').html(dateStringify(config.data.ebtProduct.lockStart));
    $('#lockEnd').html(dateStringify(config.data.ebtProduct.lockEnd));
    $('#waverDate').html('犹豫期'+config.data.ebtProduct.hesitateTerm+'天');
    $('#buySuccess').html(config.data.ebtProduct.buySuccess);
    //    是否可以购买
    if(config.data.ebtProduct.buyable){
        $('#buyAble h6').html('还有额度可以购买'+'<img class="pa" src="../dist/images/fdl_bg_prompt.png">').siblings('a').css('display','block');
    }else{
        $('#buyAble h6').html('您今天的额度已经用完'+'<img class="pa" src="../dist/images/fdl_bg_prompt.png">').siblings('a').css('backgroundColor','gray');
    }
    setTimeout(function(){
        $('#buyAble h6').hide();
    },3000);
};

//交易规则回调
var callbackRule = function(){
    //买入规则填充
    for(var i=0;i<config.data.buyRule[0].buyingRuleList.length;i++){
        $('<dd><span>'+config.data.buyRule[0].buyingRuleList[i].title+'</span><p>'+config.data.buyRule[0].buyingRuleList[i].content+'</p></dd>').appendTo( $('#ruleList'));
    }
    $('#ruleList dd').eq(0).children('p').css({lineHeight:'3.125rem',paddingTop:'0'});
    //tab选项卡
    $('#ruleTitle li').on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur');
        if($(this).index()){
            $('#ruleList').empty()
            for(var i=0;i<config.data.buyRule[1].buyingRuleList.length;i++){
                var $dd = $('<dd><span>'+config.data.buyRule[1].buyingRuleList[i].title+'</span><p>'+config.data.buyRule[1].buyingRuleList[i].content+'</p></dd>')
                $dd.appendTo( $('#ruleList'));
            }
            $('#ruleList dd').eq(1).children('p').css({lineHeight:'3.125rem',paddingTop:'0'});
        }else{
            $('#ruleList').empty()
            for(var i=0;i<config.data.buyRule[0].buyingRuleList.length;i++){
                var $dd = $('<dd><span>'+config.data.buyRule[0].buyingRuleList[i].title+'</span><p>'+config.data.buyRule[0].buyingRuleList[i].content+'</p></dd>')
                $dd.appendTo( $('#ruleList'))
            }
            $('#ruleList dd').eq(0).children('p').css({lineHeight:'3.125rem',paddingTop:'0'});
        }
    })
};
//提示信息回调
var callBackPrompt=function(){
    // 风险提示
    for(var i=0;i<config.data.prompt.promptList.length;i++){
        //$('<dd><div><span>'+config.data.prompt.promptList[i].title+'</span><span class="fdl_icon_prompt"></span></div><div class="prompt_content">'+config.data.prompt.promptList[i].content+'</div></dd>').appendTo( $('#promptList'));
        $('<dd><div><span>'+config.data.prompt.promptList[i].title+'</span><span class="fdl_icon_prompt"></span></div></dd>').appendTo( $('#promptList'));
    }
    //$('<h6>'+config.data.prompt.promptBottom.title+'</h6><p>'+config.data.prompt.promptBottom.content+'</p>').appendTo($('#prompt_bottom'));
    // 点击展开
    $('#promptList dd').on('click',function(){
        if(!$(this).data('cur')) {
            $('<div class="prompt_content">' + config.data.prompt.promptList[$(this).index()].content + '</div>').appendTo($(this))
            $(this).data('cur', 1)
        }
        $(this).toggleClass('cur');
    })
};
//设置 localStorage 缓存和 有效时间
var callBackLocalStorage = function(){
    //清除当天 缓存
    // 离线存储
    localStorage.setItem('ebtProduct'+config.productId,JSON.stringify(config.data.ebtProduct));
    localStorage.setItem('buyRule'+config.productId,JSON.stringify(config.data.buyRule));
    localStorage.setItem('prompt'+config.productId,JSON.stringify(config.data.prompt));
    //产品信息缓存一天一清
    config.todaySurplus = todaySurplus();
    setTimeout(function(){
        localStorage.removeItem('ebtProduct'+config.productId,'prompt'+config.productId);
    },config.todaySurplus);
    // 一周后清除缓存
    setTimeout(function(){
        localStorage.removeItem('buyRule'+config.productId,'prompt'+config.productId,'prompt'+config.productId,'prompt'+config.productId);
    },604800);
//    设置过缓存就不是第一次加载
    localStorage.firstLoad=0;
};

//  再次加载页面，
var loadAgain = function(){
    // 判断哪些有缓存，哪些没缓存
    config.storage=[];
    if(localStorage['ebtProduct'+config.productId] ) {
        config.data.ebtProduct = JSON.parse(localStorage.getItem('ebtProduct' + config.productId));
        callbackEbtProduct();
    }else{
        config.storage.push('ebtProduct');
    }
    if(localStorage['buyRule'+config.productId] ) {
        config.data.buyRule = JSON.parse(localStorage.getItem('buyRule' + config.productId));
        callbackRule();
    }else{
        config.storage.push('buyRule');
    }

    if(localStorage['prompt'+config.productId] ) {
        config.data.prompt = JSON.parse(localStorage.getItem('prompt' + config.productId));
        callBackPrompt();
    }else{
        config.storage.push('prompt');
    }

//    只有读不到数据才 请求
    if(config.storage.length!==0) {
        getData.apply('null',config.storage);
    }
};

var getData =function(){
    $.ajax({
        type:"GET",
        //url: "http://192.168.0.64:8080/data/financeDetails.json",
        url: "../dist/data/financeDetails.json",
        data:JSON.stringify({
            'sign':config.sign,
            'timeStamp':config.timeStamp
        }),
        dataType: "json",
        success: function (data) {
            if(data.code==='200' && data.message==="success"){
                config.data=data.data;
                C(config.data.prompt)
                //产品信息
                callbackEbtProduct()
                // 交易规则
                callbackRule();//调用回调函数。
                //提示信息
                callBackPrompt();
                // 设置 离线缓存及清除时间
                callBackLocalStorage()
            }
        },error:function(xhr,status,error){

        }
    });
}
//判断是否为第一次加载
if(!localStorage.firstLoad){
    getData(callbackEbtProduct,callbackRule,callBackPrompt)
}else{
    loadAgain('ebtProduct','buyRule','prompt')
}

