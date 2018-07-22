const ExifOverwriter = require('./exifOverwriter');
const DirectoryReader = require('./directoryReader');
const EventEmitter = require('events');
const path = require('path');

const overwriter = new ExifOverwriter();
const reader = new DirectoryReader();

class ImageOverwriter extends EventEmitter {
  async OverwriteImagesInDirectory(dir, allowedExts, data) {
    // Read all files in the root dir
    this.emit('reading', {dir, status: 'started'});
    const files = await reader.readDirectory(dir);
    this.emit('done reading', {dir, status: 'done', files});
    

    // Filter so only allowed extentions remain
    const images = files.filter(file => allowedExts.includes(path.extname(file)))

    // Overwrite all images found in root dir
    this.emit('writing', {dir, status: 'started'});
    let imagesLeft = images.length;
    images.forEach(image => {
      overwriter.overwrite(image, data.artist || '', data.copyright || '', data.description || '');
    });

    overwriter.on('image done', () => {
      imagesLeft--;
      if(imagesLeft === 0) {
        this.emit('done writing', {dir, status: 'done', images})
      }
    })
  };
}

module.exports = ImageOverwriter;
