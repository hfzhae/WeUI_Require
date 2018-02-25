define(['public'], function(){
    require.config({
        baseUrl: 'client/',
		//urlArgs:'v='+(new Date()).getTime(),//清除缓存
        paths: {
			zepto: '../client/lib/zepto.min',
			zeptoCustom: '../client/lib/zepto.custom',
			weui: '../client/lib/weui.min',
			example: '../client/lib/example',
			page: '../client/js/page',
			loadpage: '../client/js/loadpage',
			rightpage: '../client/js/rightpage',
			public: '../client/js/public',
			qrcode: '../client/lib/qrcode',
			JsBarcode: '../client/lib/JsBarcode.all.min',
			bootstrap: '../client/js/bootstrap',
			lrz: '../client/lib/lrz.min',
			datagridscrollview: '../client/lib/datagrid-scrollview',
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