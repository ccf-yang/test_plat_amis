const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

//这里也是详尽的get urlparam queryparam 和post bodyparam的js接口示例
//get urlparam 参考接口'/formatTime/:timestamp'
//get queryparam 参考接口 '/format2'
//post bodyparam 参考接口 '/extractKeys'

// 定义 GET 请求处理程序，当收到 GET 请求时返回当前时间戳
//在server.js中已经将 /timestamp 路径与 timestampRouter 关联起来了，因此，在 timestamp.js 中定义路由时，只需要处理 /timestamp 路径下的请求即可，而不需要再重复指定 /timestamp
router.get('/', (req, res) => {
    const timestamp = Math.floor(Date.now() / 1000); // 获取当前时间的 10 位时间戳
    const dateObj = new Date(); // 创建日期对象
    const normalTime = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`; // 格式化日期时间
    res.json({ timestamp: timestamp, normaltime: normalTime }); // 将时间戳和格式化日期时间作为 JSON 响应返回
});


// 定义 GET 请求处理程序，接收时间戳作为参数，返回格式化后的日期时间,
router.get('/formatTime/:timestamp', (req, res) => {
    const timestamp = parseInt(req.params.timestamp); // 从请求参数中获取时间戳
    const dateObj = new Date(timestamp * 1000); // 使用时间戳创建日期对象
    const formattedTime = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`; // 格式化日期时间
    res.json({ formattedTime: formattedTime }); // 将格式化后的日期时间作为 JSON 响应返回
  });



// 定义 GET 请求处理程序，接收格式化后的时间作为参数，返回时间戳
router.get('/parseTime/:formattedTime', (req, res) => {
    const formattedTime = req.params.formattedTime; // 从请求参数中获取格式化后的时间
    //const timestamp = Math.floor(new Date(formattedTime).getTime() / 1000); // 将格式化后的时间转换为时间戳
    res.json({ transaftimestamp: formattedTime }); // 将时间戳作为 JSON 响应返回
  });


// 定义 POST 请求处理程序
router.post('/extractKeys', (req, res) => {
    const payload = req.body; // 获取请求体中的 payload/data
    // console.log(payload)  //console的打印会在npm start那个控制台
    // 检查 payload 中是否包含 key 为 "json" 的数据
    if (!payload || !payload.json) {
      return res.status(400).json({ error: 'Payload must contain "json" key' });
    }
        let jsonData;
    try {
        // 尝试将字符串解析为 JSON 对象
        jsonData = JSON.parse(payload.json); // 获取 json 数据
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON string' });
    }
    // console.log(jsonData)
    // 检查 json 数据是否为对象类型
    if (typeof jsonData !== 'object') {
      return res.status(400).json({ error: 'JSON data must be an object' });
    }
    const keys = Object.keys(jsonData); // 提取 json 数据的键
    // 返回以逗号分隔的键列表
    res.json({ keys: keys.join(',') });
  });

  router.get('/format2', (req, res) => {
    const timestampParam = req.query.timestamp;  //从query中获取某个key的值,这里key为timestamp，传入为xxx?timestamp=43242
    if (typeof timestampParam === 'string') {
      const timestamp = parseInt(timestampParam); // 从查询字符串中获取时间戳
      const dateObj = new Date(timestamp * 1000); // 使用时间戳创建日期对象
      const formattedTime = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}:${dateObj.getSeconds().toString().padStart(2, '0')}`; // 格式化日期时间
      res.json({ formattedTime: formattedTime }); // 将格式化后的日期时间作为 JSON 响应返回
    } else {
      res.status(400).json({ error: 'Invalid timestamp' }); // 如果时间戳参数无效，则返回错误状态码
    }
  });
  
  

module.exports = router;