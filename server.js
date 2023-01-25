var server = require('ws').Server;
var s = new server({ port: 5002 });
var ping = require('./src/ping.js');
const addressList = ['10.0.1.21', '10.0.2.20', '192.168.3.1', '192.168.5.1', '192.168.6.1', '192.168.3.251'];

s.on('connection', (ws, request) => {
    let connectedAddress = String(ws._socket.remoteAddress).slice(7);
    console.log(`connected : ${connectedAddress}`);

    setInterval(() => {
        let lake = {};

        addressList.forEach(address => {
            lake[address] = ping.pingForLinux(address, 1);
        });

        ws.send(JSON.stringify(lake));
    }, 1000);

    ws.on('message', (message) => {
    });

    ws.on('close', () => {
    });
});