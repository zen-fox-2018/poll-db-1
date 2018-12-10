const View = require('../Views/Views.js')
const Politcians = require('../Models/Politicians.js')
const Voters = require('../Models/Voters.js')

class Controller {
    static create(input) {
        Politcians.create(input, function(err) {
            if(err) {
                View.displayError(err, 'Failed Insert Data',)
            } else {
                View.displaySuccess(`Success Insert Data ${input.name}`)
            }
        })
    }

    static update(input) {
        Politcians.update(input, function(err) {
            if(err) {
                View.displayError(err, 'Failed Update Data')
            } else {
                View.displaySuccess(`Success Update Data`)
            }
        })
    }

    static delete(input) {
        Politcians.delete(input, function(err) {
            if(err) {
                View.displayError(err, 'Failed Delete Data')
            } else {
                View.displaySuccess(`Success Delete Data`)
            }
        })
    }
}

module.exports = Controller