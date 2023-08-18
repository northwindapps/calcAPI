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
str = '(sqrt(sqrt4 + 2 * (sin60^2 + cos60^2)))*2';
// str = 'sqrt(2)';
let result = excecute(str);
console.log(result);

function excecute(expression) {
    let tempStr = null;
    const charset = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if ([...expression].some(char => charset.has(char))) {
        return false;
    } else {
        tempStr = expression.replace(/=/g, "");
        // Continue using tempStr or perform other operations
    }

    //screening
    let firstChar = tempStr[0];
    if (firstChar === "^"){        
        return false;
    }else if (firstChar === "/"){
        return false;
    }else if (firstChar === "*"){
        return false;
    }else if (firstChar === "-"){
        return false;
    }else if (firstChar === "+"){
        return false;
    }
    
    var elements = new Array();
    var bz_local = 0;
    var startindex = -1; 
    const MAXIMUM_LOOP_NUM = 50;
    let loopcounter = MAXIMUM_LOOP_NUM;
    
    //PREPARATION
    tempStr = service.replace_constant(tempStr);
    
    //Comma Free
    tempStr = tempStr.replaceAll(",", "");    
    if(!tempStr.includes("(")){
        loopcounter = 0;
        //no braces
        if (!service.isFloat(tempStr)){
            tempStr = service.scientific_operation(tempStr);
            tempStr = service.basic_operation(tempStr);
        }
    }
    
    while (loopcounter > 0)  {
        tempStr = tempStr.replaceAll(' ','');
        //let matches = tempStr.match(/\(([^)]+)\)/g);
        let match = service.extractMostNestedBraces(tempStr);
        if (match) {
            let cloned = '(' + match + ')';//Array.from(match);
            let result = null;
            let j = 10;
            for (let i = 0; i < cloned.length; i++){
                if(service.containsAlphabetChars(cloned)){
                    result = service.scientific_operation(cloned.replace('(','').replace(')',''));
                    while (j > 0) {
                        if (result && service.isFloat(result)) {
                            tempStr = tempStr.replace(cloned,result);
                            j=0;
                        }else{
                            if(service.containsAlphabetChars(result)){
                                result = service.scientific_operation(result);
                            }else{
                                result = service.basic_operation(result);
                            }
                        }  
                        j-=1;
                    } 
                }else{
                    result = service.basic_operation(cloned.replace('(','').replace(')',''));
                    if (result) {
                        let ptn = cloned;
                        tempStr = tempStr.replace(ptn,result);
                    }           
                }
            }
        }

        match = service.extractMostNestedBraces(tempStr);
        if (!match) {
            tempStr = service.scientific_operation(tempStr);
            tempStr = service.basic_operation(tempStr);   
        }
        if (service.isFloat(tempStr)){
            loopcounter = 0;
        }
        loopcounter -= 1;
    }
    
    if (service.isFloat(tempStr)){
        return tempStr;
    }else{
        return false;
    }
}


// class Calculator{ 
// }
// module.exports = {
//     Calculator,
// };