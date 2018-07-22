const fs = require('fs');
const path = require('path');
const util = require('util');
const promisify = util.promisify;

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

class DirectoryReader {
  readDirectory(dir) {
    return new Promise(async (resolve, reject) => {
      const filesRead = [];
      readdir(dir).then(files => {
        let pendingFiles = files.length;
      
        files.forEach(async file => {
          const relativeFilename = path.join(dir, file);
  
          stat(relativeFilename).then(async fileStat => {
            if(!fileStat.isDirectory()) {
              filesRead.push(relativeFilename);
            } else {
              const filesFromDir = await this.readDirectory(relativeFilename);
              filesFromDir.forEach(file => filesRead.push(file));
            }
            pendingFiles--;
            if(pendingFiles === 0) {
              resolve(filesRead)
            }
          }).catch(error => {
            console.error(error); // Can add logging here
            reject('Something went wrong!');
          });
          
        });
      }).catch(error => {
        console.error(error);
        reject('Something went wrong!');
      });
    });
  }
}

// new DirectoryReader().readDirectory('beepboop').then(files => console.log(files)).catch(err => console.error(err))

module.exports = DirectoryReader;

