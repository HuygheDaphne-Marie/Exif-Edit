const path = require('path');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const ImageOverwriter = require('./app');

// Midleware / setup
app.use(express.static(path.join(__dirname, 'public')))
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const overwriter = new ImageOverwriter();

// Init
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}..`));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/about.html'));
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
      if(req.body[field] !== '.jpg' && req.body[field] !== '.png') settings[field] = req.body[field];
    }

    overwriter.OverwriteImagesInDirectory(settings.root, settings.types, {artist: settings.artist, copyright: settings.copyright, description: settings.description});
    
    res.sendFile(path.join(__dirname, 'public/html/working.html'));
  }
});

// Socket.io
const connections = [];
io.sockets.on('connection', socket => {
  connections.push(socket);

  socket.on('disconnect', socket => {
    connections.splice(connections.indexOf(socket), 1);
  })

  // Messages
  overwriter.on('reading', msg => {
    io.sockets.emit('new text', {text: `Started reading ${msg.dir}`});
  });
  overwriter.on('done reading', msg => {
    // Call home and tell how many images are going to be processed
    io.sockets.emit('new text', {text: `Done reading files under ${msg.dir}, read ${msg.files.length} files`});
  });
  overwriter.on('writing', msg => {
    io.sockets.emit('new text', {text: `Started writing files under ${msg.dir}`});
  });
  overwriter.on('done writing', msg => {
    // Call home and tell how many images have been processed
    io.sockets.emit('new text', {text: `All done! Changed ${msg.images.length} images their metadata, you can close this page now`});
  });
  overwriter.on('error', msg => {
    io.sockets.emit('new text', {text: `There was an error while reading your files, the path '${msg.dir}' probably doesn't exsist`});
  });
})
