// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var app = express();

var xml2js = require('xml2js');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件


app.get(/^\/([a-zA-Z]{5,8})\/?$/, function(req, res) {
	var url = 'https://ota.io/'+req.params[0]+"/manifest";
	console.log(url);
	AV.Cloud.httpRequest({
		url: url,
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
			'Accept-Encoding': 'gzip,deflate,sdch'
		},
		success: function(httpResponse) {
			var parser = new xml2js.Parser();
			parser.parseString(httpResponse.text, function(err,result) {
  				//extractedData = result['data'];
  				if (err) {
  					res.render('install', { app: {name: JSON.stringify(err)}});
  				} else {
  					var name = result.plist.dict[0].array[0].dict[0].dict[0].string[3];
  					var icon = result.plist.dict[0].array[0].dict[0].array[0].dict[1].string[1];
  					var install_url = "itms-services://?action=download-manifest&url=http://"+req.headers.host+"/"+req.params[0]+".plist";
					var bundle = result.plist.dict[0].array[0].dict[0].dict[0].string[0];
  					res.render('install', {
  						app: {
  							name: name, 
  							icon_url: icon, 
  							install_track_url: install_url,
							created_at: bundle
  						}
  					});
  				}
  			});
			
		},
		error: function(httpResponse) {
			console.error('Request failed with response code ' + httpResponse.status);
			res.render('install', { app: {name: httpResponse.text}});
		}
	})
});

app.get(/^\/([a-zA-Z]{5,8}).plist$/, function(req, res) {
	var url = 'https://ota.io/'+req.params[0]+"/manifest";
	console.log(url);
	AV.Cloud.httpRequest({
		url: url,
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml,*/*',
			'Accept-Encoding': 'gzip,deflate,sdch'
		},
		success: function(httpResponse) {
			res.set('Content-Type', 'application/plist');
			res.send(httpResponse.text);
		},
		error: function(httpResponse) {
			console.error('Request failed with response code ' + httpResponse.status);
			res.send(httpResponse.text);
		}
	})
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
