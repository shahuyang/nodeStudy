//声明全局对象
var config= {
    userId:'33',
    content:['agreement'],
    data:{},
    sign:'',
    timeStamp:''
};

var curTime = new Date();
config.timeStamp =  curTime.getTime();
config.sign = hex_md5(config.timeStamp + "6cdbea955b9129601c8e01f76436f626");


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
        $('#agreement').html(config.data);
    }else{
        getData();
    }
};


//ajax 函数
var getData =function(){
    $.ajax({
        //type:"POST",
        //url: "/appserver/services/query/getRegisterAgreement",
        type:"GET",
        url: "../dist/data/RegisterAgreement.json",
        data:JSON.stringify({
            'sign':config.sign,
            'timeStamp':config.timeStamp
        }),
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        success: function (data) {
            if(data.code=='200' && data.message=="success"){
                config.data = data.data.agreementMesssage;
                //加载协议信息
                $('#agreement').html(config.data);
                // 设置 题目离线缓存及清除时间
                callBackLocalStorage();
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



// 每次应用载入时，都会检测该清单文件
window.applicationCache.onchecking = function(){
    C('检测是否有新版本');
    return false;
};

//如果清单文件没有改动，同时应用程序也已经缓存了
window.applicationCache.onnoupdate =function(){
    C('当前应用即是最新');
    return false;
};

// 如果清单文件有变动，或者第一次 载入应用
// 触发  downing  下载 当前清单中的 文件
window.applicationCache.ondownloading =function(){
    C('下载新版本')
    window.progresscount = 0;  // 下面会用到
    return false;
};

// 下载过程中 每个文件下载完毕，会触发  progress 事件
window.applicationCache.onprogress = function(e){
//  通过 该对象 算出 下载 比例
    var progress = "";
    if(e && e.lengthComputable ){
        progress = "" + Math.round(100* e.loaded/ e.total) + "%";
    }else{
        progress = " (" + ++progresscount + ")"
    }

    C('下载新版本' + progress);
    return false;
};

// 下载完成，且 首次将应用程序 下载到缓存中时
window.applicationCache.oncached = function(){
    C('这个应用已经下载缓存完毕');
    return false;
};

// 下载完成，且 不是第一次下载缓存，是 清单文件有变化
// 这个时候，实际载入的可能是旧版本应用；
window.applicationCache.onupdateready = function(){
    C('一个新版本的应用缓存已经下载完毕');
    return false;
};

// 如果浏览器处于离线状态，检查清单 列表失败，会 触发 error
// 当未缓存的文件，引用不存在的清单文件 也会触发
window.applicationCache.onerror = function(){
    C('不能无法读取应用缓存 或者 找不到清单文件');
    return false;
};

// 一个缓存的应用程序，引用一个不存在的 清单文件，触发 obsolete 同时会将 缓存程序 删除
// 之后，不再 缓存应用，而是 从 网络请求
window.applicationCache.onobsolete = function(){
    C('应用程序不再存储，以后从网络上直接获取');
    return false;
};








