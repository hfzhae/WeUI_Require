define(['example'], function(example) {
	return function(data){
		//console.log(data)
		var e = new example(),
			strFooter = '<small style="color:#999999;">Design by zydsoft™</small>';
			
		forArr(data, function(arr) {
			if (arr.id) {
				var id = arr.id.replaceAll(' ', '_'),
					desc = arr.desc == undefined ? '' : unescape(arr.desc),
					item = arr.item?JSON.stringify(arr.item):'';
					
				var tpls = $('script[type="text/html"]'), re = 0;
				for (var i = 0, len = tpls.length; i < len; ++i) {
					var tpl = tpls[i], name = tpl.id.replace(/tpl_/, '');
					if(name === id) re = 1;
				}
				if(re == 0){
					$('body').append('<script type="text/html" id="tpl_' + id + '"><div class="page" id="' + id + '"><div class="page__hd"><h1 class="page__title">' + unescape(arr.title) + '</h1><p class="page__desc">' + unescape(desc) + '</p></div><div class="page__bd "></div><div class="page__ft ">'+ strFooter +'</div></div><script type="text/javascript">require(["loadpage"],function(loadpage){loadpage("' + id + '")});</script>');
					if(window.pageManager){//异步加载时，写入configs对象和子项目集 zz 2017-2-16
						e.setConfig(arr);
						if(arr.item){
							e.setItem(arr);
						}
					}
				}
			}
		});
		
		function forArr(arr, fn, t) {
			for (var i in arr) {
				if (t) {
					if (arr[i].id) {
						if (t === arr[i].id.replaceAll(' ', '_')) {
							fn(arr[i]);
						}
						if (typeof (arr[i].item) === 'object') {
							forArr(arr[i].item, fn, t);
						}
					}
				} else {
					fn(arr[i]);
					if (typeof (arr[i].item) === 'object') {
						forArr(arr[i].item, fn, t)
					}
				}
			}
		}
	}
});
