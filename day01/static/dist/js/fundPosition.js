//声明全局对象
var config= {
    userId:'33',
    sign:'',
    timeStamp:'',
    account:13883778530,
    content:['fundPosition'],
    data:{},
    lineGraph:[],
    chartWidth:'',
};

var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");

//折线图点阵背景绘制
(function(canvasIds){
    config.chartWidth = (getInnerWidth()-20)*0.8439;
    var oNetWorth = document.getElementById('lineGraph');
    oNetWorth.width=config.chartWidth;
    oNetWorth.height = 150;
    config.lineGraph[0] = oNetWorth.getContext('2d');
    for(var j=0;j<5;j++){
        for(var i=0;i<15;i++){
            var curX = (config.chartWidth*i)/14;
            var curY = j*37.5;
            if(curX==0){
                curX=1;
            }else if(curX==config.chartWidth){
                curX=config.chartWidth-2;
            }
            if(curY==0){
                curY=1;
            }else if(curY==150){
                curY=149;
            }
            config.lineGraph[0].fillStyle="#efefef";
            config.lineGraph[0].beginPath();
            config.lineGraph[0].arc(curX,curY,1,0,Math.PI*2,true);
            config.lineGraph[0].closePath();
            config.lineGraph[0].fill();
        }
    }
})();

// 纵坐标数据计算处理
var ordinatesY = function (dataY){
    var iTotal = config.data.lineGraph[0].ordinatesY.length;
    var totalValue =  config.data.lineGraph[0].ordinatesY[iTotal-1].title-config.data.lineGraph[0].ordinatesY[0].title;
    return (dataY/totalValue+0.5)*150;
};
// 横坐标数据计算处理
var ordinatesX = function(dataX){
    var iTotal = config.data.lineGraph[0].ordinatesX.length;
    var totalValue = config.data.lineGraph[0].ordinatesX[iTotal-1].title - config.data.lineGraph[0].ordinatesX[0].title;
    return ((dataX-config.data.lineGraph[0].ordinatesX[0].title)/totalValue)*config.chartWidth;
};

//折线图绘制
var lineGraphDrwa = function(){
    // 传入坐标
    for(var i=0;i<config.data.lineGraph[0].ordinatesY.length;i++){
        $('<dd>'+(config.data.lineGraph[0].ordinatesY[i].title*100).toFixed(2)+'%</dd>').appendTo($('#fd_netWorth .fd_ordinates'));
    }
    for(var i=0;i<config.data.lineGraph[0].ordinatesX.length;i++){
        $('<li>'+dateStringify(config.data.lineGraph[0].ordinatesX[i].title,2)+'</li>').appendTo($('#fd_netWorth .fd_ordinatesX'));
    }
    //  canvas 绘制函数
    function drawLine (shape,cxt){
        cxt.beginPath();
        cxt.moveTo(ordinatesX(shape.lineData[0].thenDate),ordinatesY(shape.lineData[0].promitRate));
        for(var i=1;i<shape.lineData.length;i++){
            cxt.lineTo(ordinatesX(shape.lineData[i].thenDate),ordinatesY(shape.lineData[i].promitRate));
        }
        cxt.lineWidth = shape.lineWidth?shape.lineWidth:1;
        cxt.strokeStyle =shape.lineColor?shape.lineColor:'#f7f7f7';
        cxt.stroke();
    }
    // 绘制折线图
    for (var i=0;i<config.data.lineGraph[0].profitLines.length;i++ ){
        drawLine(config.data.lineGraph[0].profitLines[i],config.lineGraph[0]);
    }
};

var callBackPosition = function(){
    //持仓详情
    $('#yesIncome').html(config.data.positions.yesterdayIncome);
    $('#totalAssets').html(config.data.positions.totalAssets);
    $('#holdAmount').html(config.data.positions.holdAmount);
    $('#transitAmount').html(config.data.positions.transitAmount);
    $('#holdCent').html(config.data.positions.holdCent);
    $('#accruedProfit').html(config.data.positions.accruedProfit);
    $('#castSurely').html(config.data.positions.castSurely);
    $('#dividentStatu').html(config.data.positions.dividentStatu);
    $('#curNetWorth').html(config.data.positions.curNetWorth);
    $('#curDate').html(dateStringify(config.data.positions.curDate));
    //交易 明细
    for(var i=0;i<config.data.tradeDeatils.length;i++){
        $(' <dd><div><span>'+config.data.tradeDeatils[i].operate+'</span><p>'+config.data.tradeDeatils[i].volume+'</p></div><div><time>'+config.data.tradeDeatils[i].time+'</time><p>'+config.data.tradeDeatils[i].statu+'</p></div></dd>').appendTo($('#tradeDeatils'))
    }
    changeColor();
    //折线图绘制
    lineGraphDrwa();
    // 净值图 or 分时图 选项卡
    $('#fd_chart li').on('click',function(){
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $('#fd_chart .fd_chart_list').eq($(this).index()).show().siblings('.fd_chart_list').hide();
    });
};

//设置 localStorage 缓存和 有效时间
var callBackLocalStorage = function(){
    // 离线存储
    localStorage.setItem(config.content[0]+config.userId,JSON.stringify(config.data));
    //  设置缓存时间  截止到 第二天上午九点
    setTimeout(function(){
        localStorage.removeItem(config.content[0]+config.userId);
    },todaySurNine());
//    设置过缓存就不是第一次加载
    localStorage['notFirstLoad'+config.content+config.userId]=1;
};

//  再次加载页面，
var loadAgain = function(){
    // 判断哪些有缓存，哪些没缓存
    if(localStorage[config.content[0]+config.userId] ) {
        config.data = JSON.parse(localStorage.getItem(config.content[0] + config.userId));
        callBackPosition();
    }else{
        getData();
    }
};

//ajax 函数
var getData =function(){
    $.ajax({
        type:"POST",
        //url: "/appserver/services/risk/queryFpRiskQuestionInfos",
        url: "../dist/data/fundPosition.json",
        data:JSON.stringify({
            'sign':config.sign,
            'account':config.account,
            'timeStamp':config.timeStamp
        }),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(data.code == '200'){
                //config.data = JSON.parse(data.data);
                config.data = data.data;
                //持仓基金 展现
                callBackPosition();
                // 设置 题目离线缓存及清除时间
                callBackLocalStorage()
            }else{
                C(data.code+' '+data.message)
            }
        },error:function(error){
            C(error)
        }
    });
};

//判断是否为第一次加载
if(localStorage['notFirstLoad'+config.content+config.userId]){
    loadAgain();
}else{
    getData();
}


