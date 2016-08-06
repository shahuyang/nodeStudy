//声明全局对象
var config= {
    userId:'33',
    account:13883778530,
    content:['questions'],
    data:{},
    answerRecord:[],
    aRecord:{},
    sign:'',
    timeStamp:'',
    result:''
};

var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");

var dDOnclick =function(){
    // 问题列表第一个家选中状态
    $('#evaluatingList dd').on('click',function(){
        $(this).addClass('cur').siblings('dd').removeClass('cur');
        $(this).parent().addClass('cur').siblings('dl').removeClass('cur');
        // 把答题记录 以对象的形式 存储在 全局变量 中
        config.aRecord[$(this).siblings('dt').data('id')]=$(this).data('id');
        config.answerRecord.length=0;
        for(var i in  config.aRecord){
            config.answerRecord.push({
                questionId:i,
                optionId:config.aRecord[i]
            })
        }
        // 把答题记录存在 storage 中
        localStorage.setItem('answerRecord',JSON.stringify(config.answerRecord));
    });
};

//问题选项回调用
var callBackQuestions=function(){
    // 风险提示
    for(var i=0;i<config.data.length;i++){
        var $dl = $('<dl><dt data-id='+config.data[i].question.riskQuestionId+'><span>'+(i+1)+'</span><p>'+config.data[i].question.questionContent+'</p></dt></dl>');
        for(var j=0;j<config.data[i].questionOpts.length;j++){
            $('<dd data-id='+config.data[i].questionOpts[j].riskOptionId+'><p>'+config.data[i].questionOpts[j].optionContent+'</p><img src="../dist/images/icon_confirm.png"></dd>').appendTo($dl)
        }
        $dl.appendTo($('#evaluatingList'));
    };
    // 判断能不能拿到答题记录，能拿到就显示答题记录
    if(localStorage.getItem('answerRecord') && (GetUrlParam('clearRecord') !=1)){
        config.answerRecord = JSON.parse(localStorage.getItem('answerRecord'));
        var $aDl = $('#evaluatingList dl');
        for(var j=0;j <config.answerRecord.length;j++){
            for(var i=0;i<$aDl.length;i++){
                if($aDl.eq(i).children('dt').data('id') == config.answerRecord[j].questionId){
                    //    第 i 个题目有答题记录，需要在获取 第 i 个题目的 第 g 个是已选选项
                    var riskOptionId = config.answerRecord[j].optionId ;
                    var aDd=$aDl.eq(i).get(0).getElementsByTagName('dd');
                    for(var g=0;g<aDd.length;g++){
                        if(aDd[g].getAttribute('data-id')==riskOptionId){
                            $aDl[i].getElementsByTagName('dd')[g].className='cur';
                        }
                    }
                }
            }
        }
        //遍历 没有答题的 问题，最靠前的一个 加  cur


        // 遍历 缓存对象， 存在 config.aRecord 中
        var aLastAnswer = JSON.parse(localStorage.getItem('answerRecord'));
        for(var i=0;i<aLastAnswer.length;i++){
            config.aRecord[aLastAnswer[i].questionId]=aLastAnswer[i].optionId;
        }
    }else{
        config.aRecord = {};
        localStorage.removeItem('answerRecord')
        $('#evaluatingList dl').eq(0).addClass('cur');
    };

    dDOnclick();


    //点击提交按钮时
    $('#btnSubmit').on('click',function(){
        var curTime = new Date();
        config.timeStamp =  curTime.getTime();
        config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");
        //打印传参内容
        C(JSON.stringify({
            'sign':config.sign,
            'timeStamp':config.timeStamp,
            'account':config.account,
            'questionAnswerStr':JSON.stringify(config.answerRecord)
        }));
        if(config.answerRecord.length === config.data.length){
            $.ajax({
                type:"POST",
                //url: "/appserver/services/risk/commitRiskEva",
                url: "../dist/data/assementResult.json",
                data: JSON.stringify({
                    'sign':config.sign,
                    'account':config.account,
                    'timeStamp':config.timeStamp,
                    'questionAnswerStr':JSON.stringify(config.answerRecord)
                }),
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                success: function (data) {
                    if(data.code==='200' && data.message==="成功"){
                        config.result = (JSON.parse(data.data)).type;
                        //location = encodeURI('http://localhost/appserver-web/static/templates/assessmentResult.html?resultType='+config.result);
                        location = encodeURI('http://localhost:63342/test/templates/assessmentResult.html?resultType='+config.result);
                    }else{
                        C(data.code+' '+data.message);
                    }
                },error:function(error){
                    C(error)
                }
            });
        }else{
            console.log('您题目还没答完');
            prompt($('#prompt'),'您题没答完',false)
        }
    })
};


//设置 localStorage 缓存和 有效时间
var callBackLocalStorage = function(){
    // 离线存储
    localStorage.setItem(config.content[0]+config.userId,JSON.stringify(config.data));
    // 一周后清除缓存
    setTimeout(function(){
        localStorage.removeItem(config.content[0]+config.userId);
    },604800);
//    设置过缓存就不是第一次加载
    localStorage.notFirstLoad=1;
};


//  再次加载页面，
var loadAgain = function(){
    // 判断哪些有缓存，哪些没缓存
    if(localStorage[config.content[0]+config.userId] ) {
        config.data = JSON.parse(localStorage.getItem(config.content[0] + config.userId));
        callBackQuestions();
    }else{
        getData();
    }
};


//ajax 函数
var getData =function(){
    $.ajax({
        type:"POST",
        //url: "/appserver/services/risk/queryFpRiskQuestionInfos",
        url: "../dist/data/assement.json",
        data:JSON.stringify({
            'sign':config.sign,
            'account':config.account,
            'timeStamp':config.timeStamp
        }),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(data.code==='200' && data.message==="成功"){
                config.data = JSON.parse(data.data);
                //提示信息
                callBackQuestions();
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
if(localStorage.notFirstLoad){
    loadAgain();
}else{
    getData();
}














