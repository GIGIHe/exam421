$(function(){
    var M = {

	}
    var userInfo = {}
    // window.LS.remove('userInfo')
     function reload_html(){
        if(window.LS.get('userInfo')){
            userInfo = JSON.parse(window.LS.get('userInfo'))
            $('.username').text(userInfo.name)
            $('.logout').show()
            $('.my-coll').attr('href','./component/collect.html')
        }else{
            $('.username').click(function(){
                window.location.href = './component/login.html'
            })
            $('.my-coll').attr('href','javascript:;')
            $('.username').text('未登录，请登录')
            $('.logout').hide()
        }
     }
     reload_html()
     $(document).on('click','.logout',function(){
        window.LS.set('userInfo',[])
        reload_html()
     })
     $('.my-coll').click(function(){
        if(!window.LS.get('userInfo')){
            if(M.dialogrm1){
                return M.dialogrm1.show();
            }
            M.dialogrm1 = jqueryAlert({
                'content' : '请先登录',
                'closeTime' : 2000
            })
        }
     })
})