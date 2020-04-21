// 判断游览器的类型是否为ie6 7 8 9
if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
    new WOW().init();
}
if ((/msie [9|10]/i.test(navigator.userAgent))){
    // $(".c4conboxstep").show();
    // $(".c4conbox").css({
    //     borderWidth: '1px',
    //     borderStyle: 'dashed',
    //     borderColor: '#b4daf8'
    // })
}

var wow = new WOW({
    boxClass: 'wow', 
    animateClass: 'animated', 
    offset: 20, 
    mobile: true, 
    live: true 
})
//增加wow方法
$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});