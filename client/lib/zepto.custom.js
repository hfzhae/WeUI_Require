$.alert = function(c, bt, fn) {
    var dialogalert = $('<div class="js_dialog" id="iosDialog2" style="display: none;"><div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd">' + c + '</div><div class="weui-dialog__ft"><a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + bt + '</a></div></div></div>');
    $('#container').append(dialogalert);
    dialogalert.show();
    dialogalert.on('click', '.weui-dialog__btn', function() {
        fn();
        $(this).parents('.js_dialog').hide();
    });
}
$.confirm = function(t, c, bt1, bt2, fn1, fn2) {
    if (bt1 != '') bt1 = '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">' + bt1 + '</a>';
    if (bt2 != '') bt2 = '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">' + bt2 + '</a>';
    var dialogConfirm = $('<div class="js_dialog" style="display: none;"><div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__hd"><strong class="weui-dialog__title">' + t + '</strong></div><div class="weui-dialog__bd">' + c + '</div><div class="weui-dialog__ft">' + bt1 + bt2 + '</div></div></div>');
    $('#container').append(dialogConfirm);
    dialogConfirm.show();
    dialogConfirm.on('click', '.weui-dialog__btn_primary', function() {
        fn1();
        $(this).parents('.js_dialog').hide();
    });
    dialogConfirm.on('click', '.weui-dialog__btn_default', function() {
        fn2();
        $(this).parents('.js_dialog').hide();
        //$.toast('取消操作', 'cancel');
    });
};
$.toast = function(c, i, t) {//c:标题，i:图标，t:显示时间单位毫秒
    switch (i) {
        case 'loading':
            i = '<i class="weui-loading weui-icon_toast"></i>';
            break;
        case 'success':
            i = '<i class="weui-icon-success-no-circle weui-icon_toast" style="font-size:80px;margin:10px;"></i>';
            break;
        case 'err':
            i = '<i class="weui-icon-cancel weui-icon_msg" style="font-size:80px;margin:10px;"></i>';
            break;
        default:
            i = '<i class="weui-icon-info-circle weui-icon_msg" style="font-size:80px;margin:10px;"></i>';
            break;
    }
    var l = $('<div style="display:none;"><div class="weui-mask_transparent"></div><div class="weui-toast" style="-webkit-transform: rotate3d(0,1,0,0deg);">' + i + '<p class="weui-toast__content">' + c + '</p></div></div>');
    $('#container').append(l);
	if(t == undefined) t = 1000;
	l.show();
	if (t > 0) {
		setTimeout(function() {
			l.hide();
		}, t);
	}
    this.hide = function() {
		l.hide();
    }
    this.show = function() {
        l.show();
    }
    return l;
}
