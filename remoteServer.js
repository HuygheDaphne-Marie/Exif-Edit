const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());

app.post('/api/exif-edit/processing', (req, res) => {
  fs.appendFile('log.log', `${req.body.dateTime} -> (${req.body.id}) ${req.body.status.toUpperCase()} ${req.body.amount}\n`, err => {
    if(err) throw err;
    res.sendStatus(200);
  })
  
});

const PORT = process.env.LOGPORT || 5050
app.listen(PORT, () => { console.log(`Listening on ${PORT}`) });