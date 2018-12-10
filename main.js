const argv = process.argv.slice(2)
const Controller = require('./Controllers/Controller.js')

let input = null
switch (argv[0]) {
    case 'create':
        input = {
            name: argv[1],
            party: argv[2],
            location: argv[3],
            grade: argv[4]
        }
        Controller.create(input)
    break;

    case 'update' :
        input = {
            id: argv[1],
            field: argv[2],
            value: argv[3]
        }
        Controller.update(input)
    break;

    case 'delete':
        Controller.delete(argv[1])
    break;

    default:
        break;
}