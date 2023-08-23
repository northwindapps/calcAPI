const {Service} = require('./service');
const Decimal = require('decimal.js');
const service = new Service();
const propertyMap = new Map();
propertyMap.set("name", "John Doe");
propertyMap.set("x", 30);

// Set properties using the Map
// service.setProperties(propertyMap);
let exp = '2 + ((0.2 + 2 * 0.205 + 2 * 0.205 + 0.211 )/6)';
exp = 'e'
let result = service.excecute(exp);
console.log(result);

let result2 = service.runge_kutta_method('y^2+1',0,0,0.1);

console.log(result2[0]);

function runge_kutta_method(fx,x0,y0,h,l=10) {
    // fx = y - x
    //k1
    let k1_x0 = x0 ;
    let k1_y0 = y0;
    propertyMap.set("h", h);


    for (let index = 0; index < l; index++) {

        k1_x0 = x0 + h * index;
        propertyMap.set("x0", k1_x0);
        propertyMap.set("y0", k1_y0);

        propertyMap.set("x", k1_x0);
        propertyMap.set("y", k1_y0);
        service.setProperties(propertyMap);
        let r1 = service.excecute(fx);
        propertyMap.set("r1", r1);
        service.setProperties(propertyMap);
        let k1 = service.excecute('h*r1');
        propertyMap.set("k1", k1);
        service.setProperties(propertyMap);

        //k2
        let k2_x0 = service.excecute('x0 + 0.5 * h');
        propertyMap.set("x", k2_x0);
        service.setProperties(propertyMap);
        let k2_y0 = service.excecute('y0 + 0.5 * ' + k1);
        propertyMap.set("y", k2_y0);
        service.setProperties(propertyMap);
        let r2 = service.excecute(fx);
        propertyMap.set("r2", r2);
        service.setProperties(propertyMap);
        let k2 = service.excecute('h*r2');
        propertyMap.set("k2", k2);
        service.setProperties(propertyMap);

        //k3
        let k3_y0 = service.excecute('y0 + 0.5 * ' + k2);
        propertyMap.set("y", k3_y0);
        service.setProperties(propertyMap);
        let r3 = service.excecute(fx);
        propertyMap.set("r3", r3);
        service.setProperties(propertyMap);
        let k3 = service.excecute('h*r3');
        propertyMap.set("k3", k3);
        service.setProperties(propertyMap);

        //k4
        let k4_x0 = service.excecute('x0 + h');
        propertyMap.set("x", k4_x0);
        service.setProperties(propertyMap);
        let k4_y0 = service.excecute('y0  + ' +k3);
        propertyMap.set("y", k4_y0);
        service.setProperties(propertyMap);
        let r4 = service.excecute(fx);
        propertyMap.set("r4", r4);
        service.setProperties(propertyMap);
        let k4 = service.excecute('h*r4');
        propertyMap.set("k4", k4);
        service.setProperties(propertyMap);

        propertyMap.set("y", k1_y0);
        service.setProperties(propertyMap);
        let y = service.excecute('y + ((k1 + 2*k2 + 2*k3 + k4)/6)');
        let x = x0 + h * index;
        k1_x0 = x;
        k1_y0 = y;

        
        console.log(x);
        console.log(y);
    }
    
}