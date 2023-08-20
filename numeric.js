const {Service} = require('./service');
const Decimal = require('decimal.js');
const service = new Service();

// let exp = '10 + 4';
// let result = service.excecute(exp);
// console.log(result);


const service2 = new Service([["name", "John Doe"],["x", 30]]);
let exp = '10 + 4 + x';
let result = service2.excecute(exp);

function runge_kutta_method(fx,y0,h) {
    let k1 = h;
}