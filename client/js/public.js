String.prototype.replaceAll = function(str1, str2) {var str = this;var result = str.replace(eval("/" + str1 + "/gi"), str2);return result;}
var validFloat = (f, def) => {var n = parseFloat(f);if (isNaN(n)) return def;return n;},
	validInt = (i, def) => {var n = parseInt(i);if (isNaN(n)) return ((def==undefined)?0:def);return n;},
	toDecimal2 = (x) => {
		var f = parseFloat(x);
		if (isNaN(f)) {
			return false;
		}
		var f = Math.round(x * 100) / 100;
		var s = f.toString();
		var rs = s.indexOf('.');
		if (rs < 0) {
			rs = s.length;
			s += '.';
		}
		while (s.length <= rs + 2) {
			s += '0';
		}
		return s;
	},
	randomString = (len) => {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	getQueryString = (name) => {
		if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
			return '';
		}
		var queryString = location.href.substring(location.href.indexOf("?") + 1).split("#")[0];
		var parameters = queryString.split("&");

		var pos, paraName, paraValue;
		for (var i = 0; i < parameters.length; i++) {
			pos = parameters[i].indexOf('=');
			if (pos == -1) { continue; }
			paraName = parameters[i].substring(0, pos);
			paraValue = parameters[i].substring(pos + 1);
			if (paraName == name) {
				return unescape(paraValue.replace(/\+/g, " "));
			}
		}
		return '';
	},
	screenMode = 1,//屏幕模式，1：窄屏，2：宽屏
	setWideScreen = () => {
		if ($('body').width() >= 750) {
			$('#container').addClass('container_wide_screen');
			if($('.container_left').length === 0){
				$('body').append('<div class="container_left">');
				$('.container_left').find('.page__bd').remove();
				$('.container_left').append('<div class="page__bd">');
				//$('.container_left').find('.page__bd').append('<div class="weui-cells"></div>');
				$('.container_left').find('.page__bd').append('<div class="weui-cell"><div class="weui-cell__bd" style="color:#CCCCCC;">Home</div><div>');
				$('.container_left').find('.page__bd').append('<div class="weui-cell"><div class="weui-cell__bd" style="color:#CCCCCC;">Back</div><div>');
				$('.container_left').find('.page__bd').append('<div class="page__ft  j_bottom"><small style="color:#CCCCCC;">Help</small></div>');
			}
			if($('.container_right').length === 0){
				$('body').append('<div class="container container_right"><div class="page js_show" style="background-color:#ffffff!important;"><div class="page__hd"><h1 class="page__title"></h1><p class="page__desc"></p></div></div></div>');
				$('.container_right').find('.page').append('<div class="page__bd">');
				$('.container_right').find('.page__bd').append('<div class="CenterDiv"><img src="client/images/152.png" width="60"><br>This is WeUI page<br>design by zydsoft of require code<br>©2018<br><br><hr size="1"><br><div style="text-align:left;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br>Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br>Aliquam ac feugiat dolor. Proin mattis massa sit amet enim iaculis tincidunt. Mauris tempor mi vitae sem aliquet pharetra. Fusce in dui purus, nec malesuada mauris. Curabitur ornare arcu quis mi blandit laoreet. Vivamus imperdiet fermentum mauris, ac posuere urna tempor at. Duis pellentesque justo ac sapien aliquet egestas. Morbi enim mi, porta eget ullamcorper at, pharetra id lorem.<br><br>Donec sagittis dolor ut quam pharetra pretium varius in nibh. Suspendisse potenti. Donec imperdiet, velit vel adipiscing bibendum, leo eros tristique augue, eu rutrum lacus sapien vel quam. Nam orci arcu, luctus quis vestibulum ut, ullamcorper ut enim. Morbi semper erat quis orci aliquet condimentum. Nam interdum mauris sed massa dignissim rhoncus.<br><br>Regards,Tilo<br><br><br></div></div>');
			}
			$('.container_right').width($(window).width()-457);	
			screenMode = 2;
		} else {
			$('#container').removeClass('container_wide_screen');
			$('.container_left').remove();
			$('.container_right').remove();
			screenMode = 1
		} 
	};



