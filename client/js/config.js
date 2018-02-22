define(['public'], function(){
    require.config({
        baseUrl: 'client/',
		//urlArgs:'v='+(new Date()).getTime(),//清除缓存
        paths: {
			zepto: 'lib/zepto.min',
			zeptoCustom: 'lib/zepto.custom',
			weui: 'lib/weui.min',
			example: 'lib/example',
			page: 'js/page',
			loadpage: 'js/loadpage',
			rightpage: 'js/rightpage',
			public: 'js/public',
			qrcode: 'lib/qrcode',
			JsBarcode: 'lib/JsBarcode.all.min',
			bootstrap: 'js/bootstrap',
			lrz: 'lib/lrz.min',
			wx: 'http://res.wx.qq.com/open/js/jweixin-1.2.0'
        },
		waitSeconds: 15,//设置超时
		map: {
			'*': {
				'css': 'lib/css'
			}
		},
		shim : {
			bootstrap:{ 
				deps:[
					'css!../client/css/example.css',
					'css!../client/css/public.css',
					'css!../client/css/weui.css',
				]
			},
			wx: {
				exports: 'wx'
			}
		}
    });
	require(['bootstrap']);
});