const Operations = require('./operations.js');
const argv = process.argv.slice(2);

switch (argv[0]) {
  case 'input':
    Operations.input(argv.slice(1));
    break;
    case 'delete':
      Operations.delete(argv.slice(1));
      break;
    case 'update':
      Operations.update(argv.slice(1));
      break;
    case 'numberOne':
    Operations.numberOne(argv.slice(1));
      break;
    case 'numberTwo':
    Operations.numberTwo(argv.slice(1));
    break;
    case 'numberFour':
    Operations.numberFour(argv.slice(1));
    break;
    case 'numberFive':
    Operations.numberFive(argv.slice(1));
      break;
  default:
  console.log('Salah');
}
