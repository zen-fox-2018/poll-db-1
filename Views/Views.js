class View {
    static displaySuccess(msg) {
        console.log(msg)
    }

    static displayError(err, msg) {
        console.log(err, msg)
    }
}

module.exports = View