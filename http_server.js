const express = require('express')
const ping = require('./src/main.js')
const app = express()
const port = 8080

// http://localhost:3000/ でresponce.jsonの中身を返す。
app.get("/", (req, res, next) => {

    console.log(req.method, req.url)
    res.json(ping.pingForWindows('10.0.1.21', 1))
    res.end();

});

// ポート3000でサーバ起動
app.listen(port, () => console.log(`click http://localhost:${port}/ !`))