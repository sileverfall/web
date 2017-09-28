var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});
//
//module.exports = router;

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: 'Express'
        });
    });
    app.get('/contents', function (req, res) {
        res.render('contents', {
            title: '內容'
        });
    });
    app.get('/ajax', function (req, res, next) {
        res.render('ajax');
    });
//    app.post('/req_ajax', urlencodedParser, function (req, res, next) {
             //        /* req.body对象
             //           包含POST请求参数。
             //           这样命名是因为POST请求参数在REQUEST正文中传递，而不是像查询字符串在URL中传递。
             //           要使req.body可用，可使用中间件body-parser
             //        */
             //        var type = req.body.type;
             //        var info = req.body.info;
             //        console.log("服务器收到一个Ajax [" + type + "] 请求，信息为：" + info);
             //        res.json(['success', "服务器收到一个Ajax [" + type + "] 请求，信息为：" + info]);
             //    });
    app.get('/req_ajax', function (req, res, next) {
        /* req.query对象
           通常称为GET请求参数。
           包含以键值对存放的查询字符串参数
           req.query不需要任何中间件即可使用
        */
        var type = req.query.type;
        var info = req.query.info;
        console.log("服务器收到一个Ajax [" + type + "] 请求，信息为：" + info);
        res.json(['success', "服务器收到一个Ajax [" + type + "] 请求，信息为：" + info]);
    });


};