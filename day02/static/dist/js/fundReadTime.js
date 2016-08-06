//折线图绘制
var realTimeDrwa = function(graphData,index){
    // 纵坐标数据计算处理
    var ordinatesY = function (dataY){
        var iTotal = graphData[index].ordinatesY.length;
        var totalValue =  graphData[index].ordinatesY[iTotal-1].rate-graphData[index].ordinatesY[0].rate;
        return (dataY/totalValue+0.5)*140;
    };
// 横坐标数据计算处理  获取已经开盘多久了
    var ordinatesX = function(dataX){
        var curTime = new Date(parseInt(dataX));
        if(curTime.getHours() > 11){
            var differ = (curTime.getHours()-11)*60 + curTime.getMinutes();
        }else{
            var differ = (curTime.getHours()-9)*60 + curTime.getMinutes()-30;
        }
        return (differ/240)*config.chartWidth;
    };
    // 传入坐标
    $('#fd_netWorth .fd_ordinates').empty();
    for(var i=0;i<graphData[index].ordinatesY.length;i++){
        $('<dd>'+(parseFloat(graphData[index].ordinatesY[i].rate)*100).toFixed(2)+'%</dd>').appendTo($('#fd_netWorth .fd_ordinates'));
    }
    $('#fd_netWorth .fd_ordinatesX').empty();
    $('<li>09:30</li>'+
        '<li style="left:12vw;">10:30</li>'+
        '<li style="left:29vw;">11:30/13:00</li>'+
        '<li style="left:54vw;">12:00</li>'+
        '<li style="left:70vw;">15:00</li>').appendTo($('#fd_netWorth .fd_ordinatesX'));

    //  canvas 折现绘制函数
    function drawLine (shape,cxt){
        cxt.beginPath();
        cxt.moveTo(ordinatesX(shape.lineData[0].thenDate),ordinatesY(shape.lineData[0].curRate));
        for(var i=1;i<shape.lineData.length;i++){
            cxt.lineTo(ordinatesX(shape.lineData[i].thenDate),ordinatesY(shape.lineData[i].curRate));
        }
        cxt.lineWidth = shape.lineWidth?shape.lineWidth:1;
        cxt.strokeStyle =shape.lineColor?shape.lineColor:'#f7f7f7';
        cxt.stroke();
    }
    if(config.lineGraph[1]){
        config.lineGraph[1].clearRect(0,0,config.chartWidth,150);
    }
    chartBg('lineGraphSec',1);
    // 绘制折线图
    drawLine(graphData[index].profitLines,config.lineGraph[1]);
};

//实时估值绘制
var realTimeGraph = function(){
    // 实时估值 折线图提示部分
    $('#fdn_chart_up p').show().siblings('#fd_netWorth_tab').hide();
    $('#lineGraphSec').show().siblings('#lineGraph').hide();
    // 实时估值 动态数据
    $('#curDataList').empty().hide().siblings('#rtDataList').show().empty();
    $('<dd>日期 <span>'+dateStringify(config.realTime[0].currentDate,2)+'</span></dd>' +
        '<dd>估算净值 <span class="js_color">'+config.realTime[0].currentNav+'</span></dd>' +
        '<dd>估算涨幅 <span class="js_color">'+config.realTime[0].currentRating+'</span></dd>').appendTo($('#rtDataList'));
    changeColor()
//    画折线图
    C(2)
    realTimeDrwa(config.realTime,0)

};




var realTimer;
var callBackGraphTab = function(){
    $('#fd_chart li').on('click',function(){
        $(this).addClass('cur').siblings('li').removeClass('cur');
        if($(this).index()){
            realTimeGraph(0)
            realTimer = setInterval(function(){
                if(config.realTime[0].notTradeTime){
                    clearInterval(realTimer)
                }
                getRealTime();
                realTimeGraph();
            },3000);
        }else{
            clearInterval(realTimer);
            callBackNetWorth(config.netWorthTab);
        }
    });
};


var getRealTime = function(){
    $.ajax({
        type:"POST",
        url: "../dist/data/realTime.json",
        data:JSON.stringify({
            'sign':config.sign,
            'account':config.account,
            'timeStamp':config.timeStamp
        }),
        dataType: "json",
        //async:false,
        contentType: "application/json;charset=UTF-8",
        success: function(data){
            if(data.code == '200'){
                //config.data = JSON.parse(data.data);
                config.realTime = data.data;
                C(1)
            }else{
                C(data.code+' '+data.message)
            }
        },error:function(error){
            C(error)
        }
    });
};