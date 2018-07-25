const EventEmitter = require('events');
const exiftool = require('node-exiftool')
const exiftoolBin = require('dist-exiftool')

class ExifOverwriter extends EventEmitter {
  overwrite(file, artist, copyright, description) {
    const ep = new exiftool.ExiftoolProcess(exiftoolBin)
    ep
      .open()
      .then(() => ep.writeMetadata(`${file}`, {
        all: '', // remove existing tags
        Artist: artist,
        Copyright: copyright,
        ImageDescription: description,
      }, ['overwrite_original']))
      .then(() => ep.close())
      .then(() => this.emit('image done'))
      .catch(console.error)
  };
}

 module.exports = ExifOverwriter;