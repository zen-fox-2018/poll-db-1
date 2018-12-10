const fs = require('fs');

class readData {
  static readFile(file) {
    const fileData = fs.readFileSync(file, 'utf8');
    return fileData.split('\n');
  }

  static readData(file) {
    let rawData = readData.readFile(file);
    rawData = rawData.map( d => d.split(','));
    return rawData;
  }
}
module.exports = readData;
