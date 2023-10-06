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
const inputString = '-5x^3+sqrt(x^frac{3}{4}-4x^2+4x)-4x^2a^(x-3)y^3-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}-4t';


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
            elementCalc(elementList);
            list.push({ type: 'EOE', value: 'EOE', next: null });

        }
        counter -= 1;
    }
}
// console.log(list);

function elementCalc(element) {
    console.log(element); 
    //TODO read remaining
   
    let openIndex = element[0].next.indexOf("(");
    let closeIndex = element[0].next.lastIndexOf(")");
    let outerContent = '';
    if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
        outerContent = element[0].next.substring(openIndex + 1, closeIndex);
        console.log(outerContent);
    } 


    const resultArraySub = splitStringWithBracketsSub(outerContent);
    for (let index = 0; index < resultArraySub.length; index++) {
        console.log('resultArraySub[' + index + ']');
        console.log(resultArraySub[index]);
    
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