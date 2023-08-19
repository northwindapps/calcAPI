const Decimal = require('decimal.js');

class Service {
    constructor(){}
    
    replace_constant(source){
        let input = source;
        input = input.replaceAll('pi', Math.PI.toString());
        input = input.replaceAll('pi', Math.E.toString());
        return input;
    }
    
    num_check(source){
        var regex = /[^-0123456789.]/g;
        // Replace characters not in the set with an empty string
        var numonly = source.replace(regex, "");
        return numonly;
    }

    extractMostNestedBraces(input) {
        let depth = 0;
        let currentDepth = 0;
        let startIndex = -1;
        let endIndex = -1;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === '(') {
                currentDepth++;
                if (currentDepth > depth) {
                    depth = currentDepth;
                    startIndex = i;
                }
            } else if (input[i] === ')') {
                if (currentDepth === depth) {
                    endIndex = i;
                    break;
                }
                currentDepth--;
            }
        }

        if (startIndex !== -1 && endIndex !== -1) {
            return input.substring(startIndex + 1, endIndex);
        } else {
            return null;
        }
    }
    
    scientific_operation(source){
        var input = source;//sin60,sqrt4,log
        //(elements)
        //(cos60+sin60+8)
        input = input.replaceAll('(','');
        input = input.replaceAll(')','');
        const elements = input.match(/[a-z]+\s*-?\d+(\.\d+)?/gi);
        if (elements) {
            for (let i = 0; i < elements.length; i++){
                if (elements[i].includes("asin")) {
                    if (this.isFloat(elements[i].replaceAll("asin", ""))){
                        let exp = elements[i].replaceAll("asin", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.asin(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("acos")) {
                    if (this.isFloat(elements[i].replaceAll("acos", ""))){
                        let exp = elements[i].replaceAll("acos", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.acos(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("atan")) {
                    if (this.isFloat(elements[i].replaceAll("atan", ""))){
                        let exp = elements[i].replaceAll("atan", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.atan(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("sin")) {
                    if (this.isFloat(elements[i].replaceAll("sin", ""))){
                        let exp = elements[i].replaceAll("sin", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.sin(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("cos")) {
                    if (this.isFloat(elements[i].replaceAll("cos", ""))){
                        let exp = elements[i].replaceAll("cos", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.cos(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("tan")) {
                    if (this.isFloat(elements[i].replaceAll("tan", ""))){
                        let exp = elements[i].replaceAll("tan", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.tan(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }   
                if (elements[i].includes("sqrt")) {
                    if (this.isFloat(elements[i].replaceAll("sqrt", ""))){
                        let exp = elements[i].replaceAll("sqrt", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.sqrt(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }    
                if (elements[i].includes("abs")) {
                    if (this.isFloat(elements[i].replaceAll("abs", ""))){
                        let exp = elements[i].replaceAll("abs", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.abs(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }  
                if (elements[i].includes("exp")) {
                    if (this.isFloat(elements[i].replaceAll("exp", ""))){
                        let exp = elements[i].replaceAll("exp", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.exp(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("logd")) {
                    if (this.isFloat(elements[i].replaceAll("logd", ""))){
                        let exp = elements[i].replaceAll("logd", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log10(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                } 
                if (elements[i].includes("logb")) {
                    if (this.isFloat(elements[i].replaceAll("logb", ""))){
                        let exp = elements[i].replaceAll("logb", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log2(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("log")) {
                    if (this.isFloat(elements[i].replaceAll("log", ""))){
                        let exp = elements[i].replaceAll("log", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
            }   
        }
        return input;
    }
    
    isFloat(str) {
        return /^-?\d+(\.\d+)?$/.test(str);
    }  

    areAllFloats(item) {
        return !isNaN(parseFloat(item));
      }

    containsAlphabetChars(str) {
        return /[a-zA-Z]/.test(str);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

    basic_operation(source){
        var resultvalue = new Decimal("0.0");
        var input = source;
        input = input.replaceAll("--" , "+");
        input = input.replaceAll("+" , " + ");
        input = input.replaceAll("/" , " / ");
        input = input.replaceAll("-" , " -");
        input = input.replaceAll("*" , " * ");
        input = input.replaceAll("^" , " ^ ");

        
        
        let elements = input.split(' ');
        elements = elements.filter(function(item) {
            return item !== "nil" && item !== "" && item !== null && item !== undefined;
        });
        
        let checkings = Array.from(elements);
        checkings = checkings.filter(function(item) {
            return item !== "+";
        });

        if (checkings.every(this.areAllFloats)) {
            elements = checkings;        
            //MUST NEED
            if (elements.length > 1) {
                for (let i = 0; i < elements.length; i++){
                    if (this.isFloat(elements[i-1]) && this.isFloat(elements[i])){
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i]);
                        let resultvalue = a.plus(b);
                        elements[i] = resultvalue.toString();
                        elements[i-1] = "nil";
                    }
                }
            }
            elements = elements.filter(function(item) {
                return item !== "nil";
            });
            return elements.join('');
        
            
        }else{
            if (elements.includes('^')) {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i] == "^" &&  typeof elements[i-1] !== "undefined" && this.isFloat(elements[i-1]) && typeof elements[i+1] !== "undefined" && this.isFloat(elements[i+1])) {                    
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i+1]);
                        var c =  a.pow(b);
                        elements[i+1] = c.toString();
                        elements[i-1] = "nil";
                        elements[i] = "nil";                
                    }
                }
            }else{
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i] == "*" && typeof elements[i-1] !== "undefined" && this.isFloat(elements[i-1]) && typeof elements[i+1] !== "undefined" && this.isFloat(elements[i+1])) {
                        let a = new Decimal(elements[i-1])
                        let b = new Decimal(elements[i+1])
                        resultvalue = a.times(b); 
                        elements[i+1] = resultvalue.toString();
                        elements[i-1] = "nil";
                        elements[i] = "nil";
                    }
                    
                    if (elements[i] == "/" && this.isFloat(elements[i-1]) && this.isFloat(elements[i+1])){
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i+1]);
                        if (elements[i+1] == "0") {
                            elements[i-1] = "nil";
                            elements[i] = "nil";
                            elements[i+1] = "nil";
                        }
                        else{
                            resultvalue = a.dividedBy(b);
                            elements[i+1] = resultvalue.toString();
                            elements[i-1] = "nil";
                            elements[i] = "nil";
                        }
                    }
                }
            }
            elements = elements.filter(function(item) {
                return item !== "nil";
            });

            return elements.join('');
        }
    }
    
    excecute(expression) {
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
        
        const MAXIMUM_LOOP_NUM = 50;
        let loopcounter = MAXIMUM_LOOP_NUM;
        
        //PREPARATION
        tempStr = this.replace_constant(tempStr);
        
        //Comma Free
        tempStr = tempStr.replaceAll(",", "");    
        if(!tempStr.includes("(")){
            loopcounter = 0;
            //no braces
            if (!this.isFloat(tempStr)){
                tempStr = this.scientific_operation(tempStr);
                tempStr = this.basic_operation(tempStr);
            }
        }
        
        while (loopcounter > 0)  {
            tempStr = tempStr.replaceAll(' ','');
            //let matches = tempStr.match(/\(([^)]+)\)/g);
            let match = this.extractMostNestedBraces(tempStr);
            if (match) {
                let cloned = '(' + match + ')';//Array.from(match);
                let result = null;
                let j = 10;
                for (let i = 0; i < cloned.length; i++){
                    if(this.containsAlphabetChars(cloned)){
                        result = this.scientific_operation(cloned.replace('(','').replace(')',''));
                        while (j > 0) {
                            if (result && this.isFloat(result)) {
                                tempStr = tempStr.replace(cloned,result);
                                j=0;
                            }else{
                                if(this.containsAlphabetChars(result)){
                                    result = this.scientific_operation(result);
                                }else{
                                    result = this.basic_operation(result);
                                }
                            }  
                            j-=1;
                        } 
                    }else{
                        result = this.basic_operation(cloned.replace('(','').replace(')',''));
                        if (result) {
                            let ptn = cloned;
                            tempStr = tempStr.replace(ptn,result);
                        }           
                    }
                }
            }

            match = this.extractMostNestedBraces(tempStr);
            if (!match) {
                tempStr = this.scientific_operation(tempStr);
                tempStr = this.basic_operation(tempStr);   
            }
            if (this.isFloat(tempStr)){
                loopcounter = 0;
            }
            loopcounter -= 1;
        }
        
        if (this.isFloat(tempStr)){
            return tempStr;
        }else{
            return false;
        }
    }
}

module.exports = {
    Service,
};