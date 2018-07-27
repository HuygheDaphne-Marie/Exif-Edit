const http = require('http');
const uniqid = require('uniqid');

const options = {
  hostname: process.env.HOSTNAME || '127.0.0.1',
  port: process.env.RPORT || 5050,
  path: '/api/exif-edit/processing',
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json'
  }
};

const id = uniqid();


class RemoteLogger {
  log(data) {
    if(data.hasOwnProperty('status') && data.hasOwnProperty('amount')) {
      const req = http.request(options, res => {
        console.log(`STATUS: ${res.statusCode}`);
      }).on('error', e => {
        console.error(`Problem with request: ${e.message}`);
      });

      if(!data.hasOwnProperty('dateTime')) {
        const date = new Date();
        data.dateTime = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      }
      data.id = id;
      req.write(JSON.stringify(data));
      req.end();
    } else {
      console.error('Need a status and amount to log!')
    }
  }
}

// const data = {status: "Starting", amount: 900};
// new RemoteLogger().log(data);

module.exports = RemoteLogger;
