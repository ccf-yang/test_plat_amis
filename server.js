const express = require('express');
const http = require('http');
const path = require('path');
const reload = require('reload');
const bodyParser = require('body-parser');
const logger = require('morgan');
const timestampRouter = require('./routes/timestamp'); // 两步使用自定义js，1、引入 timestamp.js 文件
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json()); // 通过使用 body-parser，我们可以轻松地从请求中提取 JSON、表单数据、文本等不同类型的数据，并在 Express 应用程序中进行处理

app.use('/public', express.static('public'));
app.use('/pages', express.static('pages'));
app.use('/sdk', express.static('sdk'));

// 2、使用自定义js，将 /timestamp 路由与 timestampRouter 关联
app.use('/timestamp', timestampRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);

// Reload code here
reload(app)
  .then(function (reloadReturned) {
    // reloadReturned is documented in the returns API in the README

    // Reload started, start web server
    server.listen(app.get('port'),'0.0.0.0',function () {
      console.log(
        'Web server listening on port http://0.0.0.0:' + app.get('port')
      );
    });
  })
  .catch(function (err) {
    console.error(
      'Reload could not start, could not start server/sample app',
      err
    );
  });
