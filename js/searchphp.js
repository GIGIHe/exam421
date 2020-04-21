var M = {

}
// 
var shenfen_include = function(item, target) {
		if(item == target) {
			return true
		} else {
			return false
		}
}
// 工作地点筛选
var zhuanye_include = function(item, target) {
	if(item == target) {
			return true
		} else {
			return false
	}
}
// 学历：
var xueli_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
}
}
//培养方式：
var culture_include = function(item, target) {
		if(item == target) {
			return true
		} else {
			return false
		}
}
// 年龄：
var age_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}

// 户籍
var province_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}
// 毕业院校
var xuexiao_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}

var clickfn = function() {
	var attr = [];
	var num = [];
	var shenfen = $('#shenfen').val()
	var zhuanye = $('#zhuanye').val()
	var xueli = $('#xueli').val()
	var culture = $('#culture').val()
	var age = $('#age').val()
	var province = $('#province').val()
	var xuexiao = $('#xuexiao').val()
	if(shenfen == "") {
		// // alert('请选择身份！')
		if(M.dialog1){
			return M.dialog1.show();
		}
		M.dialog1 = jqueryAlert({
			'content' : '请选择身份！',
			'closeTime' : 2000
		})
		return;
	}
	if(zhuanye == "") {
		// alert('请选择专业！')
		  if(M.dialog2){
			return M.dialog2.show();
		}
		M.dialog2 = jqueryAlert({
			'content' : '请选择专业！',
			'closeTime' : 2000
		})
		return;
	}
	if(xueli == "") {
		// alert('请选择学历！') 
		//   });
		  if(M.dialog4){
			return M.dialog4.show();
		}
		M.dialog4 = jqueryAlert({
			'content' : '请选择学历！',
			'closeTime' : 2000
		})
		return;
	}
	if(culture == "") {
		// alert('请选择培养方式！')
		if(M.dialog5){
			return M.dialog5.show();
		}
		M.dialog5 = jqueryAlert({
			'content' : '请选择培养方式！',
			'closeTime' : 2000
		})
		return;
	}
	if(age == "") {
		// alert('请填写年龄！') 
		//   });
		  if(M.dialog6){
			return M.dialog6.show();
		}
		M.dialog6 = jqueryAlert({
			'content' : '请填写年龄！',
			'closeTime' : 2000
		})
		return;
	}
	if(province == "") {
		  if(M.dialog7){
			return M.dialog7.show();
		}
		M.dialog7 = jqueryAlert({
			'content' : '请填写请选择户籍！',
			'closeTime' : 2000
		})
		return;
	}
	if(xuexiao == "") {
		if(M.dialog8){
			return M.dialog8.show();
		}
		M.dialog8 = jqueryAlert({
			'content' : '请填写毕业院校！',
			'closeTime' : 2000
		})
		return;
	}
	$.each(datalist, function(idx, obj) {
		if(
			shenfen_include(shenfen, obj.item04) &&
			zhuanye_include(zhuanye, obj.item07) &&
			xueli_include(xueli, obj.item05) &&
			culture_include(culture, obj.item06) &&
			age_include(age, obj.item08) &&
			xuexiao_include(xuexiao, obj.item03)&&
			province_include(province, obj.item02)
			) {
			obj.data_index = idx;
			num.push(obj.data_index);
			attr.push(obj);
		}	
	});
	// console.log(attr)
	window.LS.set('res_data', JSON.stringify(attr));
	window.location.href="./component/result.html"
}

$('#dosubmit').click(function() {
	if(window.LS.get('userInfo')){
		clickfn()
	}else{
		if(M.dialog9){
			return M.dialog9.show();
		}
		M.dialog9 = jqueryAlert({
			'title'   : '中公教育',
			'content' : '未登录，请先登录',
			'modal'   : true,
			'buttons' :{
				'登录' : function(){
					M.dialog9.close();
					window.location.href = "./component/login.html"
				},
				'关闭' : function(){
					M.dialog9.close();
				}
			}
		})
	}
	
})


$('.direction_close,.direction_know').click(function() {
	$('.zg_direction').hide();
	$('.zg_cover').hide();
})