define(function() {
	return function(page){
		//console.log(item);
		$('.container_right').find('.page__hd').find('h1').html('');
		$('.container_right').find('.page__bd').remove();

		switch (page.toLowerCase()) {
			case 'isqrcode':
				$('.container_right').find('.page__hd').find('h1').html(page);
				$('.container_right').find('.page').append('<div class="page__bd  page__bd_spacing">');
				$('.container_right').find('.page__bd').append('<div class="qrcode" style="display:none;" id="qrcode"></div><img style="display:none;" class="barcode" id="barcode"/>');
				require(['qrcode'],function(){
					var qrcode = new QRCode(document.getElementById("qrcode"), {
						width: 150,
						height: 150
					});
					$('#qrcode').css({display:'',marginTop:-170});
					qrcode.makeCode('12345678901');
				});
				require(['JsBarcode'],function(){
					try {
						JsBarcode('#barcode', '12345678901', {
							displayValue:false,
							fontSize:20,
							lineColor: "#000"
						});
						$('#barcode').css({display:''});
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
				$('.container_right').find('.page__hd').find('h1').html(page);
				$('.container_right').find('.page').append('<div class="page__bd">');
				$('.container_right').find('.page__bd').append('<div class="weui-cells"></div>');
				$('.container_right').find('.weui-cells').append('<div class="weui-gallery" id="gallery"><span class="weui-gallery__img" id="galleryImg"></span><div class="weui-gallery__opr"><a href="javascript:" class="weui-gallery__del"><i class="weui-icon-delete weui-icon_gallery-delete"></i></a></div></div><div class="weui-cell"><div class="weui-cell__bd"><div class="weui-uploader"><div class="weui-uploader__hd"><p class="weui-uploader__title"><small>每次可选9张，最多上传20张。</small></p><div class="weui-uploader__info">0</div></div><div class="weui-uploader__bd"><ul class="weui-uploader__files" id="uploaderFiles"></ul><div class="weui-uploader__input-box"><input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple /></div></div></div></div></div>');
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
			default:
				$('.container_right').find('.page__hd').find('h1').html(page);
				$('.container_right').find('.page').append('<div class="page__bd  page__bd_spacing">');
				break;
		}
	}
});