"use strict"

var CMD_LIST = []
var CMD_QUICKVIEW = null

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
            $('.product-single-tab-description-item').html(detail.desc)
            $('.table-responsive').html($("#cmd_attr").tmpl(detail))
            $('.product-single-tab-image__image').html($('<img>').attr('src', detail.descImg).attr('alt', 'Product'))
        }

        const relatedList = data.filter(function (item) {
            return item.id != id
        })
        CMD_LIST = relatedList
        $('.related-product-active .swiper-wrapper').html($("#related-list").tmpl({ dataList: relatedList }))

    },
    error: function (xhr, status, error) { // 失败回调函数
        console.error(xhr, status, error);
    }
});


function dk(e) {
    const id = $(e).attr('data-id')
    const itemData = getItemDetailById(id)
    console.log(itemData)

    $("#quickView").html($("#tmpl-item-popup").tmpl(itemData))
    if (CMD_QUICKVIEW) {
        CMD_QUICKVIEW.destroy()
        CMD_QUICKVIEW = null
    }
    CMD_QUICKVIEW = new Swiper(".quick-view-product-slide .swiper", {
        spaceBetween: 0,
        navigation: {
            nextEl: ".quick-view-product-slide .swiper-button-next",
            prevEl: ".quick-view-product-slide .swiper-button-prev",
        },
    })

    let m = document.getElementById("quickView");
    var myModal = new bootstrap.Modal(m, { keyboard: false });
    myModal.show();
    // console.log(myModal)
}

function getItemDetailById(id) {
    if (!id) return null
    const dataList = CMD_LIST
    for (let i = 0; i < dataList.length; i++) {
        const item = dataList[i];
        if (item.id === id) {
            return item
        }
    }
}