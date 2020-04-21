var local_data = [];
// xkml模糊搜索



$(function(){
  var db_arr=[];//缓存收藏id
  var choice_arr=[]
  var choice_arr_text=[]
  if(window.LS.get("coll_data")){
    // window.LS.remove("coll_data")   
    db_arr=JSON.parse(window.LS.get("coll_data"));
 }
  function restdata(){
      choice_arr=[]
      choice_arr_text=[]
      for(var i=0;i<db_arr.length ; i++) {
          choice_arr.push(Number(db_arr[i].dinx))
          var nowjson=notice[Number(db_arr[i].dinx)]
          nowjson.dinx=db_arr[i].dinx
          choice_arr_text.push(nowjson)
      }
      window.LS.set('clss',JSON.stringify(choice_arr_text))
  }
  restdata()



      // 首页三项切换
    $('.nav_tab .its').each(function(index){
      $(this).click(function(){
        if(index == 1 || index == 2){
          $('.zg_wrapper').addClass("chage")
        }else{
          $('.zg_wrapper').removeClass("chage")
        }
        $(this).addClass('on').siblings(".nav_tab .its").removeClass("on")
        $(".i-con").hide().eq(index).show()

      })
    })
      // 近期公告数据渲染
    function init_data(xm){
      var attr = [];
      var data =  notice.filter((item,i,arr)=>{
        return item.xm == xm
      })
      var htmls = ""
      data.forEach((el,i)=>{
        htmls += ' <li dinx = "'+el.id+'">\
				<a href = "'+el.href+'"><h2><i class="i-line"></i><p class="h22">'+el.title+'</p></h2>\
				<div class="line"></div>\
        <p class="notice">'+el.des+'</p></a>\
        <div class="collect"><span>收藏</span><i class="col-i"></i></div></li>' 
      })
      $('.cons1').html(htmls)
      restdata()
      // console.log('db_arr',db_arr)
      // console.log(data)
      for(var n = 0; n <data.length;n++){
        for(var m = 0;m<db_arr.length;m++){
          if(data[n].id==db_arr[m].dinx){
            $('.collect span').eq(n).text('已收藏')
            $('.collect').eq(n).addClass('col-i-a')
          }
        }
      }
    }
    // init_data('公务员',0)
    init_data('公务员')

     // 近期公告 切换
    $('.tab1 span').each(function(inx){
        $(this).click(function(){
            $(this).addClass('on').siblings(".itm-nav span").removeClass('on')
            var xm = $(this).text()
            var target = inx
            // console.log(xm)
            // init_data(xm,target)
            init_data(xm)
          //   $(".cons1").hide()
          // $(".cons1").eq(target).show()
        })
    })
 
  // 收藏
  $(document).on('click','.collect',function(){
    if(!window.LS.get('userInfo')){
      if(M.dialogi1){
        return M.dialogi1.show();
      }
      M.dialogi1 = jqueryAlert({
          'content' : '请先登录！',
          'closeTime' : 2000
      })
    }else{
      var nowpush={}
      nowpush.dinx=$(this).parents('li').attr('dinx')
        if($(this).hasClass('col-i-a')){
              del_local(nowpush.dinx)
              $(this).find('span').text('收藏')
        }else{
            db_arr.push(nowpush)
            $(this).find('span').text('已收藏')
              window.LS.set("coll_data",JSON.stringify(db_arr));
              restdata()
        }
        $(this).toggleClass('col-i-a')
    }
  })
    // 考情须知 切换
  $('.tab2 span').each(function(inx){
        $(this).click(function(){
            $(this).addClass('on').siblings(".itm-nav span").removeClass('on')
            $(".cons2").hide()
            $(".cons2").eq(inx).show()
          })
    })
 
  // 重新缓存（删除）
  function del_local(targetindex){
    var new_db_arr=[]
    for ( var i=0;i<db_arr.length;i++) {
        if(db_arr[i].dinx != targetindex){
           new_db_arr.push(db_arr[i])
        }
    }
    db_arr=new_db_arr;
     window.LS.set("coll_data",JSON.stringify(db_arr));
     restdata()
}
// 使用说明 start
if(!window.sessionStorage.getItem('zg_direction')){
  $('.zg_direction').fadeIn();
  $('.zg_cover').fadeIn();
  //首页弹窗出现，使用sessionStorage加入缓存状态
  window.sessionStorage.setItem('zg_direction','true')
}
$('.direction_close,.direction_know').click(function(){
  $('.zg_direction').fadeOut(200);
  $('.zg_cover').fadeOut(200);
})
// 使用说明 end

// 查看近期公告判断是否登录
// $(document).on('click','.cons1',function(){
 
// })
// 考勤须知判断是否登录
// $(document).on('click','.cons2',function(){
//   if(!window.LS.get('userInfo')){
//     layer.open({
// 			style: 'color:#fff;background-color:#04b8e0;',
// 			content: '请先登录'
// 			,skin: 'msg'
// 			,time: 2 //2秒后自动关闭
// 		  });
//   }
// })
})


  






