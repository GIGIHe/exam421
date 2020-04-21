$(function(){
    var M={}
    $('.go-back').click(function(){
        window.history.go(-1)
    })
    $("#r_getyzm").click(function(event) {
        var phone = $("#r_phone").val();
        if (!phone) {
            if(M.dialogr1){
                return M.dialogr1.show();
            }
            M.dialogr1 = jqueryAlert({
                'content' : '请输入手机号！',
                'closeTime' : 2000
            })
            return false;
        }
        var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
        if (!phone_re.test(phone)) {
              if(M.dialogr2){
                return M.dialogr2.show();
            }
            M.dialogr2 = jqueryAlert({
                'content' : '请输入正确的手机号！',
                'closeTime' : 2000
            })
            return false;
        }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/sendmsg?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: {phone: phone},
            success: function(data) {
                if (data.status=="1") {
                    //alert('正在发送请稍后...');
                    if(M.dialogr3){
                        return M.dialogr3.show();
                    }
                    M.dialogr3 = jqueryAlert({
                        'content' : '正在发送请稍后...',
                        'closeTime' : 2000
                    })
                    var sec = 120;
                    $("#r_getyzm").text(sec+'s');
                    var timer1 = setInterval(function (){
                        sec--;
                        $("#r_getyzm").text(sec+'s');
                        if (sec<1) {
                            $("#r_getyzm").text('发送验证码');
                            clearInterval(timer1);
                        }
                    }, 1000);
                } else {
                    //alert(data.msg);
                    if(M.dialogr4){
                        return M.dialogr4.show();
                    }
                    M.dialogr4 = jqueryAlert({
                        'content' : data.msg,
                        'closeTime' : 2000
                    })
                }
            }
        });
    });
    // 重置下一步
    $("#next_btn").click(function(){
        var Myr_phone = $("#r_phone").val();
        var r_yzm = $("#r_yzm").val();
        if(Myr_phone == '') { //验证手机号是否为空
            if(M.dialogr5){
                return M.dialogr5.show();
            }
            M.dialogr5 = jqueryAlert({
                'content' : '请填写手机号！',
                'closeTime' : 2000
            })
            return false;
        }
        var reg = /^0?1[3456789]\d{9}$/; //手机号正则
        if(!reg.test(Myr_phone)) { //验证手机号是否正确
            // alert('请填写正确的手机号！');
            if(M.dialogr6){
                return M.dialogr6.show();
            }
            M.dialogr6 = jqueryAlert({
                'content' : '请填写正确的手机号！',
                'closeTime' : 2000
            })
            return false;
        }
        if(r_yzm == '') { //验证码是否为空
            // alert('请填写验证码');
            if(M.dialogr7){
                return M.dialogr7.show();
            }
            M.dialogr7 = jqueryAlert({
                'content' : '请填写验证码！',
                'closeTime' : 2000
            })
            return false;
        }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: { phone: Myr_phone},
            success: function(data) {
                 if(data.status == 1){
                    $.ajax({
                        url: 'http://zg99.offcn.com/index/chaxun/login?actid=13060&callback=?',
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {phone: Myr_phone, yzm: r_yzm},
                        success: function(data) {
                            if (data.status=="1") {
                                 setTimeout(() => {
                                    $(".step1").hide()
                                    $(".step2").show()
                                 }, 1000);
                                return false;
                            } else {
                                if(M.dialogr8){
                                    return M.dialogr8.show();
                                }
                                M.dialogr8 = jqueryAlert({
                                    'content' : data.msg,
                                    'closeTime' : 2000
                                })
                                // alert(data.msg);
                            }
                        }
            
                    })
                 }else if(data.status == 2){
                    //   });   
                    if(M.dialogr9){
                        return M.dialogr9.show();
                    }
                    M.dialogr9 = jqueryAlert({
                        'content' : '该手机号未注册！',
                        'closeTime' : 2000
                    })
                 }else {
                    if(M.dialogr10){
                        return M.dialogr10.show();
                    }
                    M.dialogr10 = jqueryAlert({
                        'content' : '该手机号未注册！',
                        'closeTime' : 2000
                    })
                    // alert(data.msg);
                }
                }
            })
    })
    // 重置密码下一步
    $("#next_btn2").click(function(){
        var Myphone2 = $("#r_phone").val();
        var yzm2 = $("#r_yzm").val();
        var pass2 = $("#pass1").val();
        var re_pass2 = $("#re-pass1").val();
        var data_source = window.location.href;
        var activity_name = '考试匹配系统';
        var fenxiao = $("#fenxiao").val();
	    var geneal = $("#geneal").val();
        if(pass2 == '') { //验证码是否为空
            // alert('请填写验证码');
            if(M.dialogr11){
                return M.dialogr11.show();
            }
            M.dialogr11 = jqueryAlert({
                'content' : '请设置密码！',
                'closeTime' : 2000
            })
            return false;
        }
            var len = pass2.length 
            if(len<6||len>10) {
                if(M.dialogr12){
                    return M.dialogr12.show();
                }
                M.dialogr12 = jqueryAlert({
                    'content' : '请设置6-10位的密码',
                    'closeTime' : 2000
                })
                return false;
            }
            if(re_pass2 == '') { //验证码是否为空
                // alert('请填写验证码');
                if(M.dialogr13){
                    return M.dialogr13.show();
                }
                M.dialogr13 = jqueryAlert({
                    'content' : '请输入确认密码！',
                    'closeTime' : 2000
                })
                return false;
            }
            if(pass2 !== re_pass2){
                if(M.dialogr14){
                    return M.dialogr14.show();
                }
                M.dialogr14 = jqueryAlert({
                    'content' : '密码不一致！',
                    'closeTime' : 2000
                })
                return false;
            }
        $.ajax({
            url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: { phone: Myphone2},
            success: function(data) {
                var user = data.user.name
                // console.log(user)
                 if(data.status == 1){
                    $.ajax({
                        url: 'http://zg99.offcn.com/index/chaxun/register?actid=13060&callback=?',
                        type: 'GET',
                        dataType: 'jsonp',
                        data: {name: user, phone: Myphone2, yzm: yzm2,password:pass2,data_source:data_source,fenxiao:fenxiao, geneal:geneal,activity_name:activity_name},
                        success: function(data) {
                            if (data.status=="1") {
                                setTimeout(() => {
                                    $(".step1,.step2").hide()
                                    $(".step3").show()
                                 }, 1000);
                                return false;
                            } else {
                                if(M.dialogr15){
                                    return M.dialogr15.show();
                                }
                                M.dialogr15 = jqueryAlert({
                                    'content' : data.msg,
                                    'closeTime' : 2000
                                })
                                // alert(data.msg);
                            }
                        }
            
                    })
                 }else if(data.status == 2){
                    if(M.dialogr16){
                        return M.dialogr16.show();
                    }
                    M.dialogr16 = jqueryAlert({
                        'content' : '未注册！',
                        'closeTime' : 2000
                    })
                 }else {
                    if(M.dialogr17){
                        return M.dialogr17.show();
                    }
                    M.dialogr17 = jqueryAlert({
                        'content' : data.msg,
                        'closeTime' : 2000
                    })
                    // alert(data.msg);
                }
                }
            })
    })
   
})