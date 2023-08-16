const {Service} = require('./Service');
const Decimal = require('decimal.js');
const service = new Service();

function exec() {
console.log(Math.PI);

const test = new Decimal(0.1);
console.log(test);
let str = '0.1 ^ 0.2 + sin60';
str = service.scientific_operation(str);
console.log(service.basic_operation(str));

}


exec();

// class Calculator{ 
// }
// module.exports = {
//     Calculator,
// };