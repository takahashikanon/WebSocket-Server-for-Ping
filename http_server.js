const express = require('express')
const ping = require('./src/main.js')
const cors = require('cors');
const app = express()
const port = 8080

app.use(cors());

app.get("/", (req, res, next) => {

    let client = {
        method: req.method,
        url: req.url,
        query: req.query,
    };

    console.log(client)

    let address = String(req.query.ip);

    res.json(ping.pingForWindows(address, 1))
    res.end();

});

app.listen(port, () => console.log(`click http://localhost:${port}/ !`))