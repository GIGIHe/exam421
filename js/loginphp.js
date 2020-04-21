

//验证是否登录
function Islogin() {

}
$(function(){
	var M = {

	}
	//获取验证码
$("#getyzm").click(function(event) {
	var phone = $("#phone").val();
	if (!phone) {
		// alert('请输入手机号');
		if(M.dialog21){
			return M.dialog21.show();
		}
		M.dialog21 = jqueryAlert({
			'content' : '请输入手机号',
			'closeTime' : 2000,
		})
		
		return false;
	}
	var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
	if (!phone_re.test(phone)) {
		//   });
		if(M.dialog22){
			return M.dialog22.show();
		}
		M.dialog22 = jqueryAlert({
			'content' : '请输入正确的手机号',
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
				if(M.dialog23){
					return M.dialog23.show();
				}
				M.dialog23 = jqueryAlert({
					'content' : '正在发送请稍后',
					'closeTime' : 2000
				})
				var sec = 120;
				$("#getyzm").text(sec+'s');
				var timer = setInterval(function (){
					sec--;
					$("#getyzm").text(sec+'s');
					if (sec<1) {
						$("#getyzm").text('发送验证码');
						clearInterval(timer);
					}
				}, 1000);
			} else {
				//alert(data.msg);
				if(M.dialog24){
					return M.dialog24.show();
				}
				M.dialog24 = jqueryAlert({
					'content' : data.msg,
					'closeTime' : 2000
				})
			}
		}
	});
});
// 注册
$("#zhuce").click(function() {
	// var formid = $("#zcformid").val();
	var username = $("#username").val();
	var Myphone = $("#phone").val();
	var yzm = $("#yzm").val();
	var pass = $("#pass").val();
	var re_pass = $("#re-pass").val();
	var data_source = window.location.href;
	var fenxiao = $("#fenxiao").val();
	var geneal = $("#geneal").val();
	var activity_name = '考试匹配系统';
	if(username == '') { //验证用户名号是否为空
		if(M.dialog25){
			return M.dialog25.show();
		}
		M.dialog25 = jqueryAlert({
			'content' : '请填写用户名！',
			'closeTime' : 2000
		})
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空秒
		//   });
		if(M.dialog26){
			return M.dialog26.show();
		}
		M.dialog26 = jqueryAlert({
			'content' : '请填写手机号！',
			'closeTime' : 2000
		})
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		  if(M.dialog27){
			return M.dialog27.show();
		}
		M.dialog27 = jqueryAlert({
			'content' : '请填写正确的手机号！',
			'closeTime' : 2000
		})
		return false;
	}
	if(yzm == '') { //验证码是否为空
		if(M.dialog28){
			return M.dialog28.show();
		}
		M.dialog28 = jqueryAlert({
			'content' : '请填写验证码！',
			'closeTime' : 2000
		})
		return false;
	}
	if(pass == '') { //验证码是否为空
		  if(M.dialog29){
			return M.dialog29.show();
		}
		M.dialog29 = jqueryAlert({
			'content' : '请设置密码！',
			'closeTime' : 2000
		})
		return false;
	}
     var len = pass.length 
	if(len<6||len>10) {
		  if(M.dialogl1){
			return M.dialogl1.show();
		}
		M.dialogl1 = jqueryAlert({
			'content' : '请设置6-10位的密码！',
			'closeTime' : 2000
		})
		return false;
	}
	if(re_pass == '') { //验证码是否为空 
		//   });
		  if(M.dialogl2){
			return M.dialogl2.show();
		}
		M.dialogl2 = jqueryAlert({
			'content' : '请输入确认密码！',
			'closeTime' : 2000
		})
		return false;
	}
	if(pass !== re_pass){
		  if(M.dialogl3){
			return M.dialogl3.show();
		}
		M.dialogl3 = jqueryAlert({
			'content' : '密码不一致！',
			'closeTime' : 2000
		})
		  return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { phone: Myphone},
		success: function(data) {
             if(data.status == 1){
				  if(M.dialogl4){
					return M.dialogl4.show();
				}
				M.dialogl4 = jqueryAlert({
					'content' : '此手机号已经注册！',
					'closeTime' : 2000
				})
			 }else if(data.status == 2){
				$.ajax({
					url: 'http://zg99.offcn.com/index/chaxun/register?actid=13060&callback=?',
					type: 'GET',
					dataType: 'jsonp',
					data: {name: username, phone: Myphone, yzm: yzm,password:pass,data_source:data_source,fenxiao:fenxiao, geneal:geneal,activity_name:activity_name},
					success: function(data) {
						if (data.status=="1") {
							  if(M.dialogl5){
								return M.dialogl5.show();
							}
							M.dialogl5 = jqueryAlert({
								'content' : '注册成功，去登陆！',
								'closeTime' : 2000
							})
							 setTimeout(() => {
								window.location.href='login.html'
							 }, 1000);
							return false;
						} else {
							if(M.dialogl6){
								return M.dialogl6.show();
							}
							M.dialogl6 = jqueryAlert({
								'content' : data.msg,
								'closeTime' : 2000
							})
							// alert(data.msg);
						}
					}
		
				})
			 }else {
				if(M.dialogl7){
					return M.dialogl7.show();
				}
				M.dialogl7 = jqueryAlert({
					'content' : data.msg,
					'closeTime' : 2000
				})
			}
			}
		})
	
})
//登录
$("#submit").click(function() {
	var Myphone = $("#phone").val();
	var pass = $('#pass').val()
	if(Myphone == '') { //验证手机号是否为空
		// alert('请输入手机号');
		// layer.open({
		// 	style: 'color:#fff;background-color:#04b8e0;',
		// 	content: '请输入手机号！'
		// 	,skin: 'msg'
		// 	,time: 2 //2秒后自动关闭
		//   });
		  if(M.dialogl9){
			return M.dialogl9.show();
		}
		M.dialogl9 = jqueryAlert({
			'content' : '请输入手机号！',
			'closeTime' : 2000
		})
		return false;
	}
	if(pass == '') { //验证手机号是否为空
		// alert('请输入密码'); 
		// layer.open({
		// 	style: 'color:#fff;background-color:#04b8e0;',
		// 	content: '请输入密码！'
		// 	,skin: 'msg'
		// 	,time: 2 //2秒后自动关闭
		//   });
		if(M.dialogl10){
			return M.dialogl10.show();
		}
		M.dialogl10 = jqueryAlert({
			'content' : '请输入密码！',
			'closeTime' : 2000
		})
		return false;
	}
	
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		// alert('请输入正确的手机号！');
		// layer.open({
		// 	style: 'color:#fff;background-color:#04b8e0;',
		// 	content: '请输入正确的手机号！'
		// 	,skin: 'msg'
		// 	,time: 2 //2秒后自动关闭
		//   });
		if(M.dialogl11){
			return M.dialogl11.show();
		}
		M.dialogl11 = jqueryAlert({
			'content' : '请输入正确的手机号！',
			'closeTime' : 2000
		})
		return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { phone: Myphone},
		success: function(data) {
             if(data.status == 1){
				// console.log(data)
				var user = data.user
				if(data.user.password === pass ){
					$.ajax({
						url: 'http://zg99.offcn.com/index/chaxun/longin?actid=13060&callback=?',
						type: 'GET',
						dataType: 'jsonp',
						data: {
							password:pass,
							phone: Myphone
						},
						success: function(data) {
							if (data.status=="1") {
								// alert("登录成功");
								window.LS.set('userInfo',JSON.stringify(user))
								// layer.open({
								// 	style: 'color:#fff;background-color:#04b8e0;',
								// 	content: '登录成功！'
								// 	,skin: 'msg'
								// 	,time: 2 //2秒后自动关闭
								//   });
								if(M.dialogl12){
									return M.dialogl12.show();
								}
								M.dialogl12 = jqueryAlert({
									'content' : '登录成功！',
									'closeTime' : 2000
								})
								  setTimeout(() => {
									  window.location.href = '../my.html'
								  }, 1000);
								
							} else {
								alert("请先注册，再登录");
							}
						}
				
					})
				}else{
					// layer.open({
					// 	style: 'color:#fff;background-color:#04b8e0;',
					// 	content: '密码错误'
					// 	,skin: 'msg'
					// 	,time: 2 //2秒后自动关闭
					//   });
					if(M.dialogl13){
						return M.dialogl13.show();
					}
					M.dialogl13 = jqueryAlert({
						'content' : '密码错误！',
						'closeTime' : 2000
					})
				}
			 }else if(data.status == 2){
				// layer.open({
				// 	style: 'color:#fff;background-color:#04b8e0;',
				// 	content: '此手机号未注册'
				// 	,skin: 'msg'
				// 	,time: 2 //2秒后自动关闭
				//   });
				if(M.dialogl14){
					return M.dialogl14.show();
				}
				M.dialogl14 = jqueryAlert({
					'content' : '此手机号未注册！',
					'closeTime' : 2000
				})
			 }else{
				// layer.open({
				// 	style: 'color:#fff;background-color:#04b8e0;',
				// 	content: data.msg
				// 	,skin: 'msg'
				// 	,time: 2 //2秒后自动关闭
				//   });
				if(M.dialogl15){
					return M.dialogl15.show();
				}
				M.dialogl15 = jqueryAlert({
					'content' : data.msg,
					'closeTime' : 2000
				})
			 }
			}
		})
	
})
$('.go-back').click(function(){
	window.history.go(-1)
})
})

