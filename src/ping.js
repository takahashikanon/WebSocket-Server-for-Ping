const { execSync } = require('child_process')
const Encoding = require('encoding-japanese');

function toString(bytes, originStringCode) {
    return Encoding.convert(bytes, {
        from: originStringCode,
        to: 'UNICODE',
        type: 'string',
    });
};

function getTimestamp() {
    let date = new Date();
    let hours = String(date.getHours()).length === 2 ? date.getHours() : '0' + String(date.getHours());
    let minutes = String(date.getMinutes()).length === 2 ? date.getMinutes() : '0' + String(date.getMinutes());
    let seconds = String(date.getSeconds()).length === 2 ? date.getSeconds() : '0' + String(date.getSeconds());
    let timestamp = hours + ':' + minutes + ':' + seconds;

    return timestamp;
};

module.exports = {
    pingForWindows: function (addressName = '', count = 1) {
        try {

            const command = `ping -n ${count} ${addressName}`;
            const data = toString(execSync(command), 'SJIS');

            let header = data.split('\r\n')[1];
            let body = data.split('\r\n')[2];
            let address = header.split(' ')[0];
            let bytes = body.split(' ')[3].replace('=', '');
            let time = body.split(' ')[5].replace('=', '').replace('<', '').replace('ms', '');

            let obj = {
                address: address,
                byte: bytes,
                time: time,
                timestamp: getTimestamp()
            };

            return obj;

        } catch {

            let obj = {
                address: addressName,
                byte: null,
                time: null,
                timestamp: getTimestamp()
            };

            return obj;
        }
    },
    pingForLinux: function (addressName = '', count = 1) {
        try {

            const command = `ping -c ${count} ${addressName}`;
            const data = toString(execSync(command), 'UTF-8');

            let header = data.split('\n')[0];
            let body = data.split('\n')[1];
            let address = header.split(' ')[1];
            let bytes = header.split(' ')[3];
            let time = body.split(' ')[6].split('=')[1].replace('ミリ秒', '');

            let obj = {
                address: address,
                byte: bytes,
                time: time,
                timestamp: getTimestamp()
            };

            return obj;

        } catch {

            let obj = {
                address: addressName,
                byte: null,
                time: null,
                timestamp: getTimestamp()
            };

            return obj;
        }
    }
};