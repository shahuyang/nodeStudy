//声明全局对象
var config= {
    userId:'33',
    sign:'',
    timeStamp:'',
    account:13883778530,
    content:['fdlnc'],
    data:{},
    lineGraph:[],
    chartWidth:'',
    fundRT:{},
    fundCode:590006
};

var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");


// 提示信息 公告信息
var callBackPrompt =function(){
    $('#fundTitleC').html(config.data.PromptTop);
    $('<h6>'+config.data.promptBottom.title+'</h6><p>'+config.data.promptBottom.content+'</p>').appendTo($('#promptBottom'))
//    公告信息
    for(var i=0;i<config.data.fundNotice.length;i++){
        $('<dd><div><h6>'+config.data.fundNotice[i].columnT+'</h6><span class="fdl_icon_prompt"></span><p>'+config.data.fundNotice[i].contentT+'</p></div><div class="prompt_content">'+config.data.fundNotice[i].contentD+'</div></dd>').appendTo($('#promptList'));
    };
    $('#promptList dd').on('click',function(){
        if(!$(this).data('cur')) {
            $('this').children('prompt_content').show();
            $(this).data('cur', 1);
        }
        $(this).toggleClass('cur');
    });
};

// 基金数据回调
var callBackFundData = function(){
    //持仓详情
    $('#roseDaily').html(config.data.fundData.roseDaily);
    $('#roseSetUp').html(config.data.fundData.roseSetUp);
    $('#netWorth').html(config.data.fundData.netWorth.value+'<span class="pa">'+dateStringify(config.data.fundData.netWorth.date,2)+'</span>');
    $('#buyRate').html(config.data.fundData.buyRate.value+'<i>%</i><s>'+config.data.fundData.buyRate.originPrice+'%</s><span>'+config.data.fundData.buyRate.sale+'折</span>');
    $('#riskLevel').html(config.data.fundData.riskLevel);
    changeLevel();
    // 业绩表现
    for(var i=0;i<config.data.listData.achievement.length;i++){
        $('<dd class="clear"><h6>'+config.data.listData.achievement[i].term+'</h6><p class="js_color">'+config.data.listData.achievement[i].riseFall+'%</p></dd>').appendTo($('#achievement'));
    }
    // 历史净值
    for(var i=0;i<(config.data.listData.netWorth.length+1);i++){
        if(i < config.data.listData.netWorth.length){
            $('<dd><p>'+dateStringify(config.data.listData.netWorth[i].date)+'</p><p>'+config.data.listData.netWorth[i].unitNetWorth+'</p><p>'+config.data.listData.netWorth[i].addNetWorth+'</p><p class="js_color">'+config.data.listData.netWorth[i].roseDaily+'%</p></dd>').appendTo($('#netWorthList'));
        }else{
            $('<dd class="fd_btn_wrap"><a id="fd_seeMore" class="blue">查看更多</a></dd>').appendTo($('#netWorthList'));
        }
    };
    //折线图下 数据列表
    $('#fd_dataList li').on('click',function(){
        $(this).addClass('cur').siblings('li').removeClass('cur');
        $('#fd_dataList dl').eq($(this).index()).show().siblings('dl').hide();
    });
};


// 折线图选项卡
var chartTab = function(){
    for(var i=0;i<config.data.lineGraph.graphTab.length;i++){
        if(i==0){
            $('<dd class="cur">'+config.data.lineGraph.graphTab[i].title+'</dd>').appendTo($('#fd_netWorth_tab'));
        }else{
            $('<dd>'+config.data.lineGraph.graphTab[i].title+'</dd>').appendTo($('#fd_netWorth_tab'));
        }

    }
};

//折线图点阵背景绘制
var chartBg = function(canvasId) {
    config.chartWidth = (getInnerWidth() - 20) * 0.8439;
    var oNetWorth = document.getElementById(canvasId);
    oNetWorth.width = config.chartWidth;
    oNetWorth.height = 150;
    config.lineGraph[0] = oNetWorth.getContext('2d');

    for (var j = 0; j < 5; j++) {
        for (var i = 0; i < 15; i++) {
            var curX = (config.chartWidth * i) / 14;
            var curY = j * 37.5;
            if (curX == 0) {
                curX = 1;
            } else if (curX == config.chartWidth) {
                curX = config.chartWidth - 2;
            }
            if (curY == 0) {
                curY = 1;
            } else if (curY == 150) {
                curY = 149;
            }
            config.lineGraph[0].fillStyle = "#efefef";
            config.lineGraph[0].beginPath();
            config.lineGraph[0].arc(curX, curY, 1, 0, Math.PI * 2, true);
            config.lineGraph[0].closePath();
            config.lineGraph[0].fill();
        }
    }
};
//折线图绘制
var lineGraphDrwa = function(index){
    // 纵坐标数据计算处理
    var ordinatesY = function (dataY){
        var iTotal = config.data.lineGraph.graphList[index].ordinatesY.length;
        var totalValue =  config.data.lineGraph.graphList[index].ordinatesY[iTotal-1].title-config.data.lineGraph.graphList[index].ordinatesY[0].title;
        return (dataY/totalValue+0.5)*150;
    };
// 横坐标数据计算处理
    var ordinatesX = function(dataX){
        var iTotal = config.data.lineGraph.graphList[index].ordinatesX.length;
        var totalValue = config.data.lineGraph.graphList[index].ordinatesX[iTotal-1].title - config.data.lineGraph.graphList[index].ordinatesX[0].title;
        return ((dataX-config.data.lineGraph.graphList[index].ordinatesX[0].title)/totalValue)*config.chartWidth;
    };
    // 传入坐标
    $('#fd_netWorth .fd_ordinates').empty();
    for(var i=0;i<config.data.lineGraph.graphList[index].ordinatesY.length;i++){
        $('<dd>'+(config.data.lineGraph.graphList[index].ordinatesY[i].title*100).toFixed(2)+'%</dd>').appendTo($('#fd_netWorth .fd_ordinates'));
    }
    $('#fd_netWorth .fd_ordinatesX').empty();
    for(var i=0;i<config.data.lineGraph.graphList[index].ordinatesX.length;i++){
        $('<li>'+dateStringify(config.data.lineGraph.graphList[index].ordinatesX[i].title,2)+'</li>').appendTo($('#fd_netWorth .fd_ordinatesX'));
    }
    //  canvas 折现绘制函数
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
    if(config.lineGraph[0]){
        config.lineGraph[0].clearRect(0,0,config.chartWidth,150);
    }
    chartBg('lineGraph');
    // 绘制折线图
    for (var i=0;i<config.data.lineGraph.graphList[index].profitLines.length;i++ ){
        drawLine(config.data.lineGraph.graphList[index].profitLines[i],config.lineGraph[0]);
    }
//    当前图表静态数据展示
    $('#curDataList').empty();
    for(var i=0;i<config.data.lineGraph.graphList[index].curDataList.length;i++){
        $('<dd><i></i>'+config.data.lineGraph.graphList[index].curDataList[i].title+'：<span class="js_color">'+config.data.lineGraph.graphList[index].curDataList[i].value+'%</span></dd>').appendTo($('#curDataList'));
    }
};

// 基金净值走势图绘制汇总
var callBackNetWorth = function(){
    // 净值折线图绘制
    chartTab()
    lineGraphDrwa(0);
    // 净值图 or 分时图 选项卡
    $('#fd_netWorth_tab dd').on('click',function() {
        $(this).addClass('cur').siblings('dd').removeClass('cur');
        if($(this).index() >= config.data.lineGraph.graphList.length){
            return;
        }else{
            lineGraphDrwa($(this).index());
        }
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
        //头尾提示信息
        callBackPrompt();
        //基金数据展示
        callBackFundData();
        //基金净值折线图绘制
        callBackNetWorth();
        changeColor();
        // 设置 题目离线缓存及清除时间
        callBackLocalStorage()
    }else{
        getData();
    }
};

//ajax 函数
var getData =function(){
    $.ajax({
        type:"POST",
        //url: "http://dp.jr.jd.com/service/fundValuation/590006.do",
        url: "../dist/data/fundDetails_nonCurrency.json",
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
                C(config.data)
                //头尾提示信息
                callBackPrompt();
                //基金数据展示
                callBackFundData();
                //基金净值折线图绘制
                callBackNetWorth();
                changeColor();
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
