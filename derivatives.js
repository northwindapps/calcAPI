const {Service} = require('./service');
const Decimal = require('decimal.js');
const service = new Service();
const {Parser} = require('./Parser');


// let inputString = 'sqrt(5)-4x^2t-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}';
// str = 'logd(10*10)+(sqrt(sqrt4 + 2 * (sin60^2 + cos60^2)))*2';
// str = '(cos45 * sin45)';
// str = '(0 + 5) * (0 - 5)';
// str = 'sqrt(2)';
// let result = excecute(str);
// console.log(result);
let inputString = 'tanx-x^2-5x^3+sqrt(x^0.75-4x^2+4x)-4x^2*a^(x-3)*y^3-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}-4t+sinx-4cosx';
console.log('inputString',inputString);
// nputString = x^frac{3}{4};
// inputString = parseFraction(inputString);
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
    const parser2 = new Parser();
    let counter = 999;
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
            //this method is fishy
            let subElements = elementCheck(elementList);
            if(subElements){
                // for (let index = 0; index < elementList.length; index++) {
                //     const subElement = elementList[index];
                //     console.log('subelement-each', subElement);
                    
                // }

                const isWrapedWithParenthesis = parenthesisCheck(elementList[0].next);
                const isWrapedWithParenthesis2 = parenthesisCheck(elementList[1].next);
                if (isWrapedWithParenthesis || isWrapedWithParenthesis2) {
                    calculate(elementList);
                }
                let content = getOuterParencesContent(elementList[0].next);
                const subsubElements = splitStringWithBracketsSub(content);
                console.log('subsub-element',subsubElements);
                for (let index = 0; index < subsubElements.length; index++) {
                    let counterSub2 = 99;
                    let elementListSub2 = [];
                    let element2 = subsubElements[index];
                    while (counterSub2>0) {
                        let resultSub2 = parser2.parse(element2);
                        element2= resultSub2.next;
                       
                        if(resultSub2.value == "" || resultSub2.next == ""){
                            counterSub2 = -1;
                        }
                        elementListSub2.push(resultSub2);
                        
            
                        if (counterSub2 === -1) {
                            // elementCalc(elementList);
                        
                            elementListSub2.push({ type: 'EOE', value: 'EOE', next: null });
                        }
                        counterSub2 -= 1;
                    }
                    console.log('subsub-elements',elementListSub2);   
                    calculate(elementListSub2);
                }
            }else{
                if (elementList.length !== 0 && elementList[0].next.length > 0) {
                    console.log('ready-to-calculate');    
                }
                calculate(elementList);
            }
            list.push({ type: 'EOE', value: 'EOE', next: null });

        }
        counter -= 1;
    }
}
console.log('list',list);

function calculate(objects) {
    let isAborted = false;
    for (let index = 0; !isAborted && index < objects.length; index++) {
        const element = objects[index];
        // console.log('eachElement',element);
        switch (element.type) {
            case 'x^':
                if (isNumeric(element.next)) {
                    if(index==0){
                        let coef = new Decimal(element.next);
                        let one = new Decimal(1.0);
                        let sub = coef.minus(one);
                        if (sub.toString() === '1') {
                            console.log('subProduct1', coef + 'x' );   
                        }else{
                            console.log('subProduct1', coef + 'x^' + sub );
                        }
                    }else{
                        const indexMinus = index-1;
                        if (isNumeric(objects[indexMinus].value)) {
                            let previous = new Decimal(objects[indexMinus].value);
                            let next = new Decimal(element.next);
                            let coef = previous.times(next);
                            let one = new Decimal(1.0);
                            let sub = next.minus(one);
                            if (sub.toString() === '1') {
                                console.log('subProduct1', coef + 'x' );   
                            }else{
                                console.log('subProduct1', coef + 'x^' + sub );
                            }
                        }
                    }
                }
                break;
            case 'x':
                if(index==0){
                    console.log('subProduct1', '1' );
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous );
                    }
                }
                break;
            case 'sqrt':
                if(index==0){
                    console.log('subProduct1', '0.5*' + element.next);
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        let next = new Decimal(0.5);
                        let coef = previous.times(next);
                        console.log('subProduct1', coef + '*' + element.next);
                    }
                }
                break;
            case 'e^':
                if(index==0){
                    console.log('subProduct1', 'e^' + element.next);
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + 'e^' + element.next);
                    }
                }
                break;
            case 'ln':
                if(index==0){
                    console.log('subProduct1', element.next + '^-1');
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + '*' + element.next + '^-1');
                    }
                }
                break;
            case '(':
                isAborted = true;
                break;
            case 'cosx':
                if(index==0){
                    console.log('subProduct1', '-sinx' );
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        let next = new Decimal(-1.0);
                        let coef = previous.times(next);
                        console.log('subProduct1', coef + 'sinx' );
                    }
                }
                break;
            case 'sinx':
                if(index==0){
                    console.log('subProduct1', 'cosx' );
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + 'cosx' );
                    }
                }
                break;
            case 'tanx':
                if(index==0){
                    console.log('subProduct1', '(secx)^2' );
                }else{
                    const indexMinus = index-1;
                    if (isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + '(secx)^2' );
                    }
                }
                break;
            default:
                break;
        }
    }

    
}

function parenthesisCheck(inputStr) {
    const regex = /^\(.+\)$/; // Regular expression pattern
    if (regex.test(inputStr)) {
        // console.log("The string starts with '(' and ends with ')'");
        return true;
    } else {
        // console.log("The string does not start with '(' and end with ')'");
        return false;
    }
}

function parseFraction(input) {
    // Use a regular expression to match the fraction pattern
    const regex = /frac{(\d+)\/(\d+)}/;
    const match = input.match(regex);
  
    if (match) {
      // Extract the numerator and denominator from the matched groups
      const numerator = new Decimal(match[1]);
      const denominator = new Decimal(match[2]);
  
      const result = numerator.dividedBy(denominator);
      result.toString();
    } else {
      // Return an error message or handle invalid input as needed
      return input; // Or throw an error
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
  
function getOuterParencesContent(inputStr) {
    let openIndex = inputStr.indexOf("(");
    let closeIndex = inputStr.lastIndexOf(")");
    let outerContent = '';
    if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
        outerContent = inputStr.substring(openIndex + 1, closeIndex);
        // console.log(outerContent);
    } 
    return outerContent;
}

function elementCheck(element) {
    // console.log('rootElement',element); 
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