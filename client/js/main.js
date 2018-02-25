/****************************************************************
Copyright (c) 2018 by ZYDSOFT Company. ALL RIGHTS RESERVED.
dev by zz on 2018/2/16
*****************************************************************/
require(['config'], function () {
	require(['zepto'], function ($) {
		$('body').append('<div class="container" id="container"></div>');
		setWideScreen();
		window.onresize = function() {setWideScreen();}
		
		require(['page'], function(setpage){
			require(['zeptoCustom'],function(){
				var l = $.toast('正在读取...', 'loading', 0);
				$.getJSON('server/home/default.asp?v=' + (new Date()).getTime(), function(data){
					setpage(data)
					require(['example'], function(example){
						var e = new example();
						e.init();
						var forArrsetItem = (arr) => {//循环插入子项目集函数 zz 2018-2-16
							for (var i in arr) {
								if (typeof (arr[i].item) === 'object') {
									if (arr[i].id) {
										e.setItem(arr[i]);
									}
									forArrsetItem(arr[i].item)
								}
							}
						}
						forArrsetItem(data);
						l.hide();
					});
				});
			});
		});
	});
});