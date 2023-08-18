const {Service} = require('./Service');
const Decimal = require('decimal.js');
const service = new Service();

function exec(str) {
console.log(Math.PI);

const test = new Decimal(0.1);
console.log(test);
str = service.scientific_operation(str);
console.log(service.basic_operation(str));

str = service.scientific_operation(str);
console.log(service.basic_operation(str));


}

let str = '0.1 ^ 0.2 + sin60';
str = 'sqrt(sin60^2 + cos60^2)';
str = 'sqrt(2)';
exec(str);

// class Calculator{ 
// }
// module.exports = {
//     Calculator,
// };