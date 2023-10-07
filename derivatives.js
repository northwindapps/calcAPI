const {Service} = require('./service');
const Decimal = require('decimal.js');
const service = new Service();
const {Parser} = require('./Parser');

function exec(str) {
console.log(Math.PI);

const test = new Decimal(0.1);
console.log(test);
str = service.scientific_operation(str);
console.log(service.basic_operation(str));

str = service.scientific_operation(str);
console.log(service.basic_operation(str));


}

// let inputString = 'sqrt(5)-4x^2t-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}';
// str = 'logd(10*10)+(sqrt(sqrt4 + 2 * (sin60^2 + cos60^2)))*2';
// str = '(cos45 * sin45)';
// str = '(0 + 5) * (0 - 5)';
// str = 'sqrt(2)';
// let result = excecute(str);
// console.log(result);
const inputString = '-x^2-5x^3+sqrt(x^frac{3}{4}-4x^2+4x)-4x^2*a^(x-3)*y^3-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}-4t';


// const separator = /(?=[+-])(?![^{]*})/g;
const resultArray = splitStringWithBrackets(inputString);

// console.log(resultArray);
// ['-', 
//'5x^3', 
//'+', 
//'sqrt(x^frac{3}{4}-4x^2+4x)', 
//'-', 
//'4x^2a^(x-3)y^3', 
//'-', 
//'e^(2x^2+3x+5)', 
//'-', 
//'10ln(x^3+5x)', 
//'+', 
//'frac{sin(x)}{cos(x)}', 
//'-', 
//'4t']
let list = [];
for (let index = 0; index < resultArray.length; index++) {
    let element = resultArray[index];
    const parser = new Parser();
    let counter = 999999999;
    let elementList = [];
    while (counter>0) {
        let result = parser.parse(element);    
        element = result.next;
        if(element == ""){
            counter = -1;
        }
        list.push(result);
        elementList.push(result);

        if (counter === -1) {
            let subElements = elementCheck(elementList);
            if(subElements){
                console.log('nested', subElements);
            }else{
                console.log('ready-to-calculate');
                calculate(elementList);
            }
            list.push({ type: 'EOE', value: 'EOE', next: null });

        }
        counter -= 1;
    }
}
console.log('list',list);

function calculate(objects) {
    for (let index = 0; index < objects.length; index++) {
        const element = objects[index];
        switch (element.type) {
            case 'x^':
                if (isNumeric(element.next)) {
                    if(index==0){
                        let coef = new Decimal(element.next);
                        let one = new Decimal(1.0);
                        let sub = coef.minus(one);
                        console.log('subProduct1', coef + 'x^' + sub );
                    }else{
                        const indexMinus = index-1;
                        if (isNumeric(objects[indexMinus].value)) {
                            let previous = new Decimal(objects[indexMinus].value);
                            let next = new Decimal(element.next);
                            let coef = previous.times(next);
                            let one = new Decimal(1.0);
                            let sub = next.minus(one);
                            console.log('subProduct1', coef + 'x^' + sub );
                        }
                    }
                }
                break;
        
            default:
                break;
        }
    }

    
}

function isNumeric(str) {
    // Use a regular expression to check if the string is numeric
    // It allows for an optional sign (+ or -), followed by digits (integer part)
    // Optionally followed by a decimal point and more digits (fractional part)
    const numericRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return numericRegex.test(str);
  }

function stringToFloatAndCheckValidity(str) {
    if (str.includes('.')) {
        const floatValue = parseFloat(str);  
        // Check if the parsed value is a valid number
        if (!isNaN(floatValue) && isFinite(floatValue)) {
        // floatValue is a valid floating-point number
        return floatValue;
        } else {
        // Invalid input or couldn't parse as a float
        return null; // You can return null, throw an error, or handle it as needed
        }
    }else{
        const intValue = parseInt(str);  
        // Check if the parsed value is a valid number
        if (!isNaN(intValue) && isFinite(intValue)) {
        // floatValue is a valid floating-point number
        return intValue;
        } else {
        // Invalid input or couldn't parse as a float
        return null; // You can return null, throw an error, or handle it as needed
        }
    }
}
  

function elementCheck(element) {
    console.log('rootElement',element); 
    //TODO read remaining
   
    let openIndex = element[0].next.indexOf("(");
    let closeIndex = element[0].next.lastIndexOf(")");
    let outerContent = '';
    if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
        outerContent = element[0].next.substring(openIndex + 1, closeIndex);
        // console.log(outerContent);
    } 

    let listSub = [];
    const resultArraySub = splitStringWithBracketsSub(outerContent);
    for (let index = 0; index < resultArraySub.length; index++) {
        // console.log('resultArraySub[' + index + ']');
        let elementSub = resultArraySub[index];
        // console.log(elementSub);
        const parser = new Parser();
        let counterSub = 99;
        let elementListSub = [];
        while (counterSub>0) {
            let resultSub = parser.parse(elementSub);
            // console.log(resultSub);    
            elementSub = resultSub.value;
            if(resultSub.value == "" || resultSub.next == ""){
                counterSub = -1;
            }
            listSub.push(resultSub);
            elementListSub.push(resultSub);

            if (counterSub === -1) {
                // elementCalc(elementList);
            
                listSub.push({ type: 'EOE', value: 'EOE', next: null });
            }
            counterSub -= 1;
        }
    
    }

    return (Object.keys(listSub).length === 0) ? false : listSub;
    
//     if (element[index].value.includes('^')) {
        
    
//     const regex = /[+-]/;
//     // Extract the content inside parentheses using a regular expression
//     const matches = element[index].next.match(/\(([^)]+)\)/);

//     // if (matches) {
//         // const contentInsideParentheses = matches[1]; // Get the content inside parentheses
//         const containsPlusOrMinus = regex.test(element[index].next);

//         if (containsPlusOrMinus) {
//             console.log("The content inside parentheses contains '+' or '-'");
     
//     const resultArraySub = splitStringWithBrackets(element[index].next);
//     let listSub = [];
//     for (let index = 0; index < resultArraySub.length; index++) {
//         let elementSub = resultArraySub[index];
        
//         console.log(elementSub);
//         const parser = new Parser();
//         let counterSub = 999999999;
//         let elementListSub = [];
//         while (counterSub>0) {
//             let resultSub = parser.parse(elementSub);    
//             elementSub = resultSub.value;
//             if(elementSub == ""){
//                 counterSub = -1;
//             }
//             listSub.push(resultSub);
//             elementListSub.push(resultSub);

//             if (counterSub === -1) {
//                 // elementCalc(elementList);
            
//                 listSub.push({ type: 'EOE', value: 'EOE', next: null });
//             }
//             counterSub -= 1;
//         }
    
//     }
//     console.log('listSub');
//     console.log(listSub);
//         }
// }
// }
}

function splitStringWithBrackets(inputString) {
    // Use regular expression to split the string
    const parts = inputString.split(/([+-])(?![^{]*}|[^\[]*]|[^\(]*\))/g);
    
    // Filter out empty strings from the result
    const result = parts.filter(part => part.trim() !== "");
    
    return result;
}

function splitStringWithBracketsSub(inputString){
    const parts = inputString.split(/([+-])/).filter(Boolean);
    // Filter out empty strings from the result
    const result = parts.filter(part => part.trim() !== "");
    
    return result;
}

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