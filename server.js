const path = require('path');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

// Midleware / setup
const urlEncodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
  res.render('pages/index');
});
app.get('/about', (req, res) => {
  res.render('pages/about');
});
app.post('/edit', [
  urlEncodedParser,
  check('root', 'Path is required').isLength({min: 1})
], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  if(req.body.jpg === undefined && req.body.png === undefined) {
    return res.send(422, 'One of the checkboxes needs to be filled!')
  } else {
    const settings = {
      types: []
    };
    if(req.body.jpg) settings.types.push(req.body.jpg);
    if(req.body.png) settings.types.push(req.body.png);

    for(const field in req.body) {
      console.log(field)
      if(req.body[field] !== '.jpg' && req.body[field] !== '.png') settings[field] = req.body[field];
    }
    
    res.render('pages/working')
  }
});


// Init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}..`));

// const EventEmitter = require('events');
// const ImageOverwriter = require('./app');

// const overwriter = new ImageOverwriter();

// overwriter.on('reading', msg => {
//   console.log(`Started reading ${msg.dir}`);
//   // Tell client that we've started reading their files under the chosen directory..
// });
// overwriter.on('done reading', msg => {
//   console.log(`Done reading files under ${msg.dir}, read ${msg.files.length} files`);
//   // Tell client that we're done reading their files under the chosen directory..
// });
// overwriter.on('writing', msg => {
//   console.log(`Started writing files under ${msg.dir}`);
//   // Tell client that we've started writing the metadata..
// });
// overwriter.on('done writing', msg => {
//   console.log(`Changed ${msg.images.length} images their metadata \nAll Done!`);
//   // Tell client work is done and that they can close the app..
// });

// // TODO: Get this data from the client..
// overwriter.OverwriteImagesInDirectory('beepboop', ['.jpg'], {artist: 'Jan Huyghe', copyright: 'Arborix.be', description: 'A plant'})
