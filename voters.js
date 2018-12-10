const readData = require('./readData.js')
class Voters {
  static seedVoters() {
    return readData.readData('./voters.csv')
  }
}

console.log(Voters.seedVoters());
