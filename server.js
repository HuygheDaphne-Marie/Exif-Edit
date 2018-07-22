const EventEmitter = require('events');
const ImageOverwriter = require('./app');

const overwriter = new ImageOverwriter();

overwriter.on('reading', msg => {
  console.log(`Started reading ${msg.dir}`);
});
overwriter.on('done reading', msg => {
  //console.log(msg.amount)
  console.log(`Done reading files under ${msg.dir}, read ${msg.files.length} files`) // 
});
overwriter.on('writing', msg => {
  console.log(`Started writing files under ${msg.dir}`)
});
overwriter.on('done writing', msg => {
  console.log(`Changed ${msg.images.length} images their metadata \nAll Done!`)
});

overwriter.OverwriteImagesInDirectory('beepboop', ['.jpg'], {artist: 'Jan Huyghe', copyright: 'Arborix.be', description: 'A plant'})




