const EventEmitter = require('events');
const exiftool = require('node-exiftool');

class ExifOverwriter extends EventEmitter {
  overwrite(file, artist, copyright, description) {
    const ep = new exiftool.ExiftoolProcess('./exiftool');
    ep
      .open()
      .then(() => ep.writeMetadata(`${file}`, {
        all: '', // remove existing tags
        Artist: artist,
        Copyright: copyright,
        ImageDescription: description,
      }, ['overwrite_original']))
      //.then(console.error, console.log)
      .then(() => ep.close())
      .then(() => this.emit('image done'))
      .catch(console.error)
  };
}

 module.exports = ExifOverwriter;