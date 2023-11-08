"use strict"

var CMD_LIST = []
var CMD_QUICKVIEW = null

$.ajax({
    url: 'assets/banners.json', // json文件的路径
    type: 'GET', // 请求的方式
    async: false, // 同步请求
    dataType: 'json', // 响应的数据格式
    success: function (data) { // 成功回调函数
        // console.log(data); // 在控制台输出读取到的数据
        $("#tmpl2").tmpl({ dataList: data }).appendTo(".slider-section .swiper-wrapper")

        /*--
            Main Slider
        -----------------------------------*/
        setTimeout(() => {
            var swiper = new Swiper(".slider-active .swiper", {
                parallax: true,
                effect: "creative",
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: ["-20%", 0, -1],
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    },
                },
                loop: true,
                speed: 1200,

                // If we need pagination
                pagination: {
                    el: ".swiper-pagination",
                    type: "bullets",
                    clickable: true,
                },

                // Navigation arrows
                navigation: {
                    nextEl: ".slider-active .swiper-button-next",
                    prevEl: ".slider-active .swiper-button-prev",
                },
                on: {
                    init: function (swiper) {
                        // console.log('init', swiper)
                        $(".home-5-slider-navigation").removeClass("hidden");
                    }
                }
            })
        }, 250);
    },
    error: function (xhr, status, error) { // 失败回调函数
        console.error(xhr, status, error);
    }
});

$.ajax({
    url: 'assets/commoditys.json', // json文件的路径
    type: 'GET', // 请求的方式
    async: false, // 同步请求
    dataType: 'json', // 响应的数据格式
    success: function (data) { // 成功回调函数
        // console.log(data); // 在控制台输出读取到的数据
        CMD_LIST = data
        $("#tmpl1").tmpl({ dataList: data }).appendTo($(".new-arrival-wrapper .row"))
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