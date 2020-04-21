$(function(){
   
    $('.itms-nav span').each(function(inx){
        $(this).click(function(){
            $(this).addClass('on').siblings(".itms-nav span").removeClass('on')
            $(".other-items").hide()
            $(".other-items").eq(inx).show()
          })
    })
    $('.back').click(function(){
        window.history.go(-1)
    })
})
