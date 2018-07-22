const EventEmitter = require('events');
const ImageOverwriter = require('./app');

const overwriter = new ImageOverwriter();

overwriter.on('reading', msg => {
  console.log(`Started reading ${msg.dir}`);
  // Tell client that we've started reading their files under the chosen directory..
});
overwriter.on('done reading', msg => {
  console.log(`Done reading files under ${msg.dir}, read ${msg.files.length} files`);
  // Tell client that we're done reading their files under the chosen directory..
});
overwriter.on('writing', msg => {
  console.log(`Started writing files under ${msg.dir}`);
  // Tell client that we've started writing the metadata..
});
overwriter.on('done writing', msg => {
  console.log(`Changed ${msg.images.length} images their metadata \nAll Done!`);
  // Tell client work is done and that they can close the app..
});

// TODO: Get this data from the client..
overwriter.OverwriteImagesInDirectory('beepboop', ['.jpg'], {artist: 'Jan Huyghe', copyright: 'Arborix.be', description: 'A plant'})




