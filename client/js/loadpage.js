define(function() {
	return function(page){
		//console.log(item);
		var arrItem = [],
			strFooter = '<small style="color:#999999;">Design by zydsoft™</small>';
		
		
		for(var i in window.pageManager._configs){
			if(window.pageManager._configs[i].name === page){
				if(window.pageManager._configs[i].item){
					arrItem = window.pageManager._configs[i].item;
				}
			}
		}
		
		if(!arrItem)return;
		
		switch (page.toLowerCase()) {
			case 'home':
				var a = $('<a class="weui-cell signinBtnStyle" href="javascript:;"><div class="weui-cell__bd" style="text-align:center;"><img src="client/images/icon/wxusericon.gif" style="width:50px;height:50px;border-radius:50%;overflow:hidden;margin-bottom:5px;"></div><div class="weui-cell__ft"></div></a>');
				$('#home').find('.page__hd').prepend(a);
				$('#' + page).find('.page__bd').append('<div class="weui-cells" style="border-bottom: 1px solid #eeeeee!important;"><div class="weui-grids"></div></div>');
				for(var i in arrItem){
					var icon = '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="">';
					if(arrItem[i].icon != undefined){
						if(arrItem[i].icon != ''){
							icon = '<img src="client/images/icon/'+ arrItem[i].icon +'">'
						}
					}
					$('#' + page).find('.weui-grids').append('<a class="weui-grid js_item" data-screenmode="'+arrItem[i].screenMode+'" data-id="' + arrItem[i].id + '" href="javascript:;"><div class="weui-grid__icon">'+ icon +'</div><p class="weui-grid__label">' + unescape(arrItem[i].title) + '</p></a>');
				}

				$('#' + page).find('.js_item').on('click', function() {
					var id = $(this).data('id'),
						dataScreenMode = validInt($(this).data('screenmode'), 1);
					if(screenMode === 1 || dataScreenMode === 1){
						window.pageManager.go(id);
					}else{
						require(["rightpage"],function(rightpage){rightpage(id)});
					}
				});
				break;
			case 'asynchronous':
				require(['page'],function(setpage){
					require(['zeptoCustom'],function(){
						var l = $.toast('正在读取...', 'loading', 0);
						$.getJSON('server/asynchronous/default.asp?v=' + (new Date()).getTime(), function(data){
							setpage(data)
							$('#' + page).find('.page__bd').append('<div class="weui-cells"></div>');
							for(var i in data){
								var icon = '<div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>';
								if(data[i].icon != undefined){
									if(data[i].icon != ''){
										icon = '<div class="weui-cell__hd"><img src="client/images/icon/'+ data[i].icon +'" alt="" style="width:20px;margin-right:5px;display:block"></div>'
									}
								}
								$('#' + page).find('.weui-cells').append('<a class="weui-cell weui-cell_access js_item" data-screenmode="'+data[i].screenMode+'" data-id="' + data[i].id + '" name="" href="javascript:;">'+ icon +'<div class="weui-cell__bd"><p>' + unescape(data[i].title) + '</p></div><div class="weui-cell__ft"><small>' + unescape(data[i].desc) + '</small></div></a>');
							}
							$('#' + page).find('.js_item').on('click', function() {
								var id = $(this).data('id'),
									dataScreenMode = validInt($(this).data('screenmode'), 1);
								if(screenMode === 1 || dataScreenMode === 1){
									window.pageManager.go(id);
								}else{
									require(["rightpage"],function(rightpage){rightpage(id)});
								}
							});
							l.hide();
						});
					});
				});
				break;
			case 'isqrcode':
				$('#' + page).find('.page__bd').append('<div class="qrcode" style="display:none;" id="qrcode"></div><img style="display:none;" class="barcode" id="barcode"/>');
				require(['qrcode'],function(){
					var qrcode = new QRCode(document.getElementById("qrcode"), {
						width: 150,
						height: 150
					});
					qrcode.makeCode('12345678901');
					$('#qrcode').css('display','');
				});
				require(['JsBarcode'],function(){
					try {
						JsBarcode('#barcode', '12345678901', {
							displayValue:false,
							fontSize:20,
							lineColor: "#000"
						});
						$('#barcode').css('display','');
					}
					catch (err) {
						$('#barcode1').remove();
					}

				});
				break;
			case 'uploadfile':
				var img = [],  //定义上传的图片地址字典
					imgNum = 0,
					imgMaxNum = 0;
				$('#' + page).find('.page__bd').append('<div class="weui-cells"></div>');
				$('#' + page).find('.weui-cells').append('<div class="weui-gallery" id="gallery"><span class="weui-gallery__img" id="galleryImg"></span><div class="weui-gallery__opr"><a href="javascript:" class="weui-gallery__del"><i class="weui-icon-delete weui-icon_gallery-delete"></i></a></div></div><div class="weui-cell"><div class="weui-cell__bd"><div class="weui-uploader"><div class="weui-uploader__hd"><p class="weui-uploader__title"><small>每次可选9张，最多上传20张。</small></p><div class="weui-uploader__info">0</div></div><div class="weui-uploader__bd"><ul class="weui-uploader__files" id="uploaderFiles"></ul><div class="weui-uploader__input-box"><input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple /></div></div></div></div></div>');
				require(['zeptoCustom'],function(){
					var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
						$gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
						$uploaderInput = $("#uploaderInput"),
						$uploaderFiles = $("#uploaderFiles");

					for (var i in img) {
						$uploaderFiles.append($(tmpl.replace('#url#', img[i].src)));
					}
					$('.weui-uploader__info').text(imgMaxNum);
					
					
					
					$uploaderFiles.on("click", "li", function() {
						var delimg = $(this);
						$.confirm('确认删除？', '您确定要删除这张图片吗？', '确定', '取消', function() {
							for (var i in img) {
								if ("url(\"" + img[i].src + "\")" == delimg.css('background-image') || "url(http://" + window.location.host + img[i].src + ")" == delimg.css('background-image')) {
									//img = removeArr(img, i);
									delete(img[i])
									imgMaxNum--;
									imgNum--
									$('.weui-uploader__info').text(imgMaxNum)
								}
							}
							delimg.remove();
						}, function() { });
					});

					var f = document.querySelector('#uploaderInput');

					f.onchange = function(e) {
						var files = e.target.files;
						var len = files.length;
						if (len > 9) {
							$.alert('一次最多只能上传9张图片！', '确认', function() { });
							return;
						}
						if (imgNum + len > 20) {
							$.alert('最多只能上传20张图片！', '确认', function() { });
							return;
						}
						var l = $.toast('正在上传...', 'loading', 0, null, 0);
						imgMaxNum += len
						$('.weui-uploader__info').text(imgNum + "/" + imgMaxNum)
						require(['lrz'],function(){
							for (var i = 0; i < len; i++) {
								lrz(files[i], { width: 640, fieldName: "file" }).then(function(rst) {
									var xhr = new XMLHttpRequest();
									xhr.open('POST', '/server/uploader/default.asp?fn=' + escape(rst.origin.name));

									xhr.onload = function() {
										if (xhr.status === 200) {
											var obj = JSON.parse(xhr.response), src;
											src = unescape(obj.src);
											setTimeout(function() {
												$uploaderFiles.append($(tmpl.replace('#url#', src)));
											}, 100);
											img[imgNum] = {};
											img[imgNum].src = src;
											imgNum++;
											if (imgNum == imgMaxNum) {
												$('.weui-uploader__info').text(imgNum);
												l.hide();
												//$('#' + page).find('.weui-uploader__file').remove();
												//$('#' + page).find('a').remove();
												//onLoadPage('uploader');
											} else {
												l.hide();
												$('.weui-uploader__info').text(imgNum + "/" + imgMaxNum)
											}

										} else {
											// 处理其他情况
										}
									};

									xhr.onerror = function() {
										// 处理错误
									};

									xhr.upload.onprogress = function(e) {
										// 上传进度
										var percentComplete = ((e.loaded / e.total) || 0) * 100;
									};

									// 添加参数
									rst.formData.append('size', rst.fileLen);
									rst.formData.append('base64', rst.base64);

									// 触发上传
									xhr.send(rst.formData);
									return rst;
								});

							//                .catch(function (err) {
							//                alert(err);
							//                })

							//                .always(function () {// 不管是成功失败，这里都会执行
							//                });

							} //for end
						});
					}
				});
				break;
			case 'mappositioning':
				$('#' + page).find('.page__bd').append('<div class="weui-cells"></div>');
				$('#' + page).find('.weui-cells').append('<div class="weui-mask_transparent"></div><div style="height:350px;" class="mapStyle weui-form-preview"><div class="weui-cell"><div class="weui-cell__bd"><input class="weui-input" type="text" placeholder="输入地址，点击搜索" id="SearchMap"></div><div class="weui-cell__ft"><button class="weui-vcode-btn" id="SearchMapbtn">搜索</button></div></div><div id="allmap"></div><div class="weui-form-preview__ft"></div></div>');
				$('#' + page).find('.weui-cells').append(a);
				break;
			default:
				$('#' + page).find('.page__bd').append('<div class="weui-cells"></div>');
				for(var i in arrItem){
					var icon = '<div class="weui-cell__hd"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width:20px;margin-right:5px;display:block"></div>';
					if(arrItem[i].icon != undefined){
						if(arrItem[i].icon != ''){
							icon = '<div class="weui-cell__hd"><img src="client/images/icon/'+ arrItem[i].icon +'" alt="" style="width:20px;margin-right:5px;display:block"></div>'
						}
					}
					$('#' + page).find('.weui-cells').append('<a class="weui-cell weui-cell_access js_item" data-screenmode="'+arrItem[i].screenMode+'" data-id="' + arrItem[i].id + '" name="" href="javascript:;">'+ icon +'<div class="weui-cell__bd"><p>' + unescape(arrItem[i].title) + '</p></div><div class="weui-cell__ft"><small>' + unescape(arrItem[i].desc) + '</small></div></a>');
				}
				$('#' + page).find('.js_item').on('click', function() {
					var id = $(this).data('id'),
						dataScreenMode = validInt($(this).data('screenmode'), 1);
					if(screenMode === 1 || dataScreenMode === 1){
						window.pageManager.go(id);
					}else{
						require(["rightpage"],function(rightpage){rightpage(id)});
					}
				});
				break;
		}
		if(($('#' + page).find('.page__ft').height() + $('#' + page).find('.page__hd').height() + $('#' + page).find('.page__bd').height()) >　$('#' + page).height()){
			$('#' + page).find('.j_bottom').removeClass('j_bottom');//判断页脚是否浮动
		}
	}
});