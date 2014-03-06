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
					res.render('install', { app: {name: JSON.stringify(result)}});
				}
			});
			
		},
		error: function(httpResponse) {
			console.error('Request failed with response code ' + httpResponse.status);
			res.render('install', { app: {name: httpResponse.text}});
		}
	})
});

// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
