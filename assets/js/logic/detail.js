function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

$.ajax({
    url: 'assets/commoditys.json', // json文件的路径
    type: 'GET', // 请求的方式
    async: false, // 同步请求
    dataType: 'json', // 响应的数据格式
    success: function (data) { // 成功回调函数
        // console.log(data); // 在控制台输出读取到的数据
        var id = getQueryString("id")
        // console.log('id=', id)
        var detail = null
        for (var i = 0; i < data.length; i++) {
            const item = data[i]
            if (item.id === id) {
                detail = item
                break
            }
        }

        if (detail) {
            // console.log('detail', detail)
            $('.product-single-section .container-fluid').html($("#cmd_detail").tmpl(detail))
        }

        $('.related-product-active .swiper-wrapper').html($("#related-list").tmpl({ dataList: data }))

    },
    error: function (xhr, status, error) { // 失败回调函数
        console.error(xhr, status, error);
    }
});