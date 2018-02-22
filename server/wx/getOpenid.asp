<%@ Language="javascript" codepage="936"%>
<%
var code = Request('code'),
	appid = 'wxf23f25f783319f6b',
	secret = '42985f31b8fa3ccf5b3671799f91bd9a',
	getOpenid = function(){
		if(Session('openid') == undefined){
			var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'),
				URL = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code&t=' + new Date().getTime();
			
			xmlhttp.Open('GET',URL, false);
			try { 
				xmlhttp.send(); 
				var result = xmlhttp.status;
			}catch(e) {
				return(false);
			}
			
			if(result==200) {
				var str = xmlhttp.responseText;
				var obj = eval('(' + str + ')');
				if(obj.openid){
					Session('openid') = obj.openid
				}else{
					Response.Write(str)
				}
				return(Session('openid')); 
			}
			delete(xmlhttp)
		}else{
			return(Session('openid')); 
		}
	}
	openid = getOpenid(),
	getUserInfo = function(){
		if(Session('userInfo') == undefined){
			var xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'),
				URL = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + Application("access_token") + '&openid=' + openid + '&lang=zh_CN&t=' + new Date().getTime();
			
			xmlhttp.Open('GET',URL, false);
			try { 
				xmlhttp.send(); 
				var result = xmlhttp.status;
			}catch(e) {
				return(false);
			}
			
			if(result==200) {
				var str = xmlhttp.responseText;
				var obj = eval('(' + str + ')');
				if(obj.openid == undefined){
					Response.Write(str)
				}else{
					Session('userInfo') = str
				}
				return(eval('(' + Session('userInfo') + ')')); 
			}
			delete(xmlhttp)
		}else{
			return(eval('(' + Session('userInfo') + ')'))
		}
	},
	UserInfo = getUserInfo();
	
Response.Write('{"openid":"' + openid + '","nickname":"'+ escape(UserInfo.nickname) +'","headimgurl":"' + UserInfo.headimgurl + '","sex":"'+UserInfo.sex+'","province":"'+escape(UserInfo.province)+'","city":"'+escape(UserInfo.city)+'","country":"'+escape(UserInfo.country)+'","unionid":"'+UserInfo.unionid+'"}');
%>