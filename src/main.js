const { execSync } = require('child_process')
const Encoding = require('encoding-japanese');

function toString(bytes, originStringCode) {
    return Encoding.convert(bytes, {
        from: originStringCode,
        to: 'UNICODE',
        type: 'string',
    });
};

// module付けないと参照できない！
module.exports = {
    pingForWindows: function (addressName = '', count = 1) {
        const command = `ping -n ${count} ${addressName}`;
        const data = toString(execSync(command), 'SJIS');

        let header = data.split('\r\n')[1];
        let body = data.split('\r\n')[2];
        let address = header.split(' ')[0];
        let bytes = body.split(' ')[3].replace('=', '');
        let time = body.split(' ')[5].replace('=', '').replace('<', '');

        let obj = {
            address: address,
            byte: bytes,
            time: time
        };

        return obj;
    },
    pingForLinux: function (addressName = '', count = 1) {
        const command = `ping -c ${count} ${addressName}`;
        const data = toString(execSync(command), 'UTF-8');

        let header = data.split('\n')[0];
        let body = data.split('\n')[1];
        let address = header.split(' ')[1];
        let bytes = header.split(' ')[3];
        let time = body.split(' ')[6].split('=')[1];

        let obj = {
            address: address,
            byte: bytes,
            time: time
        };

        return obj;
    }
};