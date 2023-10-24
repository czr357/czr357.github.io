$.ajax({
    url: 'assets/commoditys.json', // json文件的路径
    type: 'GET', // 请求的方式
    async: false, // 同步请求
    dataType: 'json', // 响应的数据格式
    success: function (data) { // 成功回调函数
        // console.log(data); // 在控制台输出读取到的数据
        $("#tmpl1").tmpl({ dataList: data }).appendTo($(".new-arrival-wrapper .row"))
    },
    error: function (xhr, status, error) { // 失败回调函数
        console.error(xhr, status, error);
    }
});

$.ajax({
    url: 'assets/banners.json', // json文件的路径
    type: 'GET', // 请求的方式
    async: false, // 同步请求
    dataType: 'json', // 响应的数据格式
    success: function (data) { // 成功回调函数
        // console.log(data); // 在控制台输出读取到的数据
        $("#tmpl2").tmpl({ dataList: data }).appendTo(".slider-section .swiper-wrapper")
    },
    error: function (xhr, status, error) { // 失败回调函数
        console.error(xhr, status, error);
    }
});