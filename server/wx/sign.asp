<!-- #include virtual="/server/lib/sha1.asp" -->
<% 
var url = unescape(Request('url')),
	appid = 'wxf23f25f783319f6b',
	secret = '42985f31b8fa3ccf5b3671799f91bd9a',
	timestamp = new Date().getTime(),
	signature = '',
	randomString = function(len){
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	},
	getToken = function(){
		var dateNow = new Date().getTime()
		if(Application("access_token") === undefined || Application("access_token_now") === undefined){
			var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'),
				URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret + '&t=' + new Date().getTime();
			
			xmlhttp.Open('GET',URL, false);
			try { 
				xmlhttp.send(); 
				var result = xmlhttp.status;
				
				}
			catch(e) {return(false);}
			
			if(result==200) {
				var str = xmlhttp.responseText;
				//Response.Write(str);
				var obj = eval('(' + str + ')');
				if(obj.access_token){
					Application("access_token") = obj.access_token;
					Application("access_token_now") = new Date().getTime();
				}else{
					Response.Write(str);
				}
				return(Application("access_token")); 
			}
		   delete(xmlhttp);
		}else{
			if((dateNow - Application("access_token_now"))/1000 > 300){
				Application("access_token") = undefined;
				Application("access_token_now") = undefined;
				getToken();
			}
			return(Application("access_token"));
		}
	},
	token = getToken(),
	getTicket = function (){
		var dateNow = new Date().getTime();
		if(Application("ticket") === undefined || Application("ticket_now") === undefined){
			var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'),
				URL = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + token + '&type=jsapi&t=' + new Date().getTime();
				
			xmlhttp.Open('GET',URL, false);
			try { 
				xmlhttp.send(); 
				var result = xmlhttp.status;}
			catch(e) {return(false);}
			
			if(result==200) { 
				var str = xmlhttp.responseText;
				//Response.Write(str);
				var obj = eval('(' + str + ')');
				if(obj.ticket){
					Application("ticket") = obj.ticket;
					Application("ticket_now") = new Date().getTime();
				}else{
					Response.Write(str);
				}
				return(Application("ticket")); 
			}
		   delete(xmlhttp)
		}else{
			if((dateNow - Application("ticket_now"))/1000 > 300){
				Application("ticket") = undefined;
				Application("ticket_now") = undefined;
				getTicket();
			}
			return(Application("ticket"));
		}
	},
	nonceStr = randomString(16),
	ticket = getTicket(),
	str = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url;

Response.Write('{"appid":"'+appid+'","nonceStr":"'+nonceStr+'","signature":"'+hex_sha1(str)+'","timestamp":"'+timestamp+'","url":"'+url+'"}');
%>
