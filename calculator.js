const {Service} = require('./Service');
const Decimal = require('decimal.js');
const service = new Service();

function exec() {
console.log(Math.PI);

const test = new Decimal(0.1);
console.log(test);

console.log(service.basic_operation('0.1 ^ 0.2'));

}


exec();

// class Calculator{ 
// }
// module.exports = {
//     Calculator,
// };