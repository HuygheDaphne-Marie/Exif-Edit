const EventEmitter = require('events');
const exiftool = require('node-exiftool');
const exiftoolBin = require('dist-exiftool');
const ep = new exiftool.ExiftoolProcess(exiftoolBin);

class ExifOverwriter extends EventEmitter {
  async overwrite(file, artist, copyright, description) {
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
      //.catch(console.error)
  };
}

 module.exports = ExifOverwriter;