(function ($) {
    //首先备份下jquery的ajax方法
    var _ajax=$.ajax;
    //重写jquery的ajax方法
    $.ajax=function(opt){
        //备份opt中error和success方法
        var fn = {
            error:function(XMLHttpRequest, textStatus, errorThrown){
                console&& console.log(errorThrown)
                if(textStatus == 'undefined'){
                    return;
                }
                var msg;
                switch(textStatus){
                    case 403:
                        msg ="系统拒绝：您没有访问权限。";
                        break;
                    case 404:
                        msg ="您访问的资源不存在。";
                        break;
                    default:
                        msg = '网络异常，请检查您的网络连接！';
                }
                try {
                    toastr && toastr.error(msg, {closeButton: true, positionClass: 'toast-bottom-right'})
                } catch (e) {
                }
            },
            success:function(data, textStatus){
                console.log(data)
            }
        }
        if(opt.error){
            fn.error=opt.error;
        }
        if(opt.success){
            fn.success=opt.success;
        }

        //扩展增强处理
        var _opt = $.extend(opt,{
            beforeSend:function(jqxhr){
                var tokenStr = sessionStorage.getItem("jhi-authenticationtoken");
                if(!tokenStr) tokenStr = localStorage.getItem("jhi-authenticationtoken");
                if(tokenStr) {
                    var token = 'Bearer ' + tokenStr;
                    jqxhr.setRequestHeader("Authorization", token);
                }
            }
        });
        return _ajax(_opt);
    };


})(jQuery);

