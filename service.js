const Decimal = require('decimal.js');

class Service {
    constructor(){}
    
    replace_constant(source){
        const input = source;
        input.replaceAll('pi', Math.PI.toString());
        input.replaceAll('pi', Math.E.toString());
        return input;
    }
    
    
    bracket_index(source,bracketsize){
        const input = source//sin60,sqrt4,log
        input.replaceAll('(',' ( ');
        input.replaceAll(')',' ) ');
        let elements = input.split(' '); 
        let bracketcount = 0;
        let calcuationstart = -1;
        
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] === '(') {
                bracketcount += 1;
                if (bracketcount === bracketsize) {
                    calcuationstart = i + 1;
                    bracketcount += 1;
                }
            }
        }
        return calcuationstart;//if -1 then over
    }
    
    num_check(source){
        var regex = /[^-0123456789.]/g;
        // Replace characters not in the set with an empty string
        var numonly = source.replace(regex, "");
        return numonly;
    }
    
    // CALCULATION_OPERATION(source:String)->(String){
    //     //1+3/4*
        
    //     //http://stackoverflow.com/questions/34540332/how-to-get-the-first-character-of-each-word-in-a-string
    //     let firstc = NUMCHECK(source: String(describing: source.first))
    //     let lastc = NUMCHECK(source: String(describing: source.last))
        
        
        
    //     if firstc != "" && lastc != ""{
            
    //         //("enter")
            
    //         var resultvalue = new Decimal(string: "0.0")
            
    //         var input = source
            
            
    //         input = input.replaceAll(of: "--", with: "+")
    //         input = input.replaceAll(of: "+", with: " ")
    //         input = input.replaceAll(of: "/", with: " / ")
    //         input = input.replaceAll(of: "-", with: " -")
    //         input = input.replaceAll(of: "*", with: " * ")
    //         input = input.replaceAll(of: "^", with: " ^ ")
            
            
            
            
    //         var elements : [String] = input.split{$0 == " "}.map(String.init)
            
            
            
    //         for i in 0..<elements.count {
                
    //             if (elements[i] == "^" && Double(elements[i-1]) != nil && Double(elements[i+1]) != nil) {
                    
    //                 if Double(elements[i+1]) == nil{
                        
    //                     elements[i+1] = "error"
                        
    //                     elements[i-1] = "nil"
    //                     elements[i] = "nil"
    //                     //error
                        
    //                 }
    //                 else{
                        
    //                     let a = Double(elements[i-1])
    //                     let b = Double(elements[i+1])
                        
    //                     var c = pow(a!, b!)
                        
    //                     c = c*100000
                        
    //                     c = round(c)/100000
                        
                        
    //                     elements[i+1] = String(describing: c)
                        
    //                     elements[i-1] = "nil"
    //                     elements[i] = "nil"
                        
    //                 }
                    
    //             }
    //         }
            
    //         elements = elements.filter{$0 != "nil"}
            
            
    //         for i in 0..<elements.count {
                
                
    //             if elements[i] == "*" && Double(elements[i-1]) != nil && Double(elements[i+1]) != nil {
    //                 //("*")
                    
    //                 let a = new Decimal(string: elements[i-1])
    //                 let b = new Decimal(string: elements[i+1])
                    
    //                 resultvalue = a.multiplying(by: b)
                    
    //                 elements[i+1] = String(describing: resultvalue)
                    
    //                 elements[i-1] = "nil"
    //                 elements[i] = "nil"
                    
    //             }
                
    //             if elements[i] == "/" && Double(elements[i-1]) != nil && Double(elements[i+1]) != nil{
                    
    //                 let a = new Decimal(string: elements[i-1])
    //                 let b = new Decimal(string: elements[i+1])
                    
    //                 if elements[i+1] == "0" {
                        
    //                     elements[i-1] = "nil"
    //                     elements[i] = "nil"
    //                     elements[i+1] = "nil"
                        
    //                 }
    //                 else{
                        
    //                     resultvalue = a.dividing(by: b)
                        
    //                     elements[i+1] = String(describing: resultvalue)
                        
    //                     elements[i-1] = "nil"
    //                     elements[i] = "nil"
                        
    //                 }
    //             }
                
                
    //         }
            
            
    //         elements = elements.filter{$0 != "nil"}
            
            
    //         //MUST NEED
    //         if elements.count > 1 {
                
    //             for i in 1..<elements.count {
                    
    //                 if Double(elements[i-1]) != nil && Double(elements[i]) != nil{
                        
    //                     let a = new Decimal(string: elements[i-1])
    //                     let b = new Decimal(string: elements[i])
                        
    //                     resultvalue = a.adding(b)
                        
    //                     elements[i] = String(describing: resultvalue)
                        
    //                     elements[i-1] = "nil"
                        
                        
                        
                        
    //                 }
    //             }
                
    //         }
            
            
            
    //         elements = elements.filter{$0 != "nil"}
            
    //         if elements.count == 1 {
                
    //             return elements[0]
    //         }
    //         else{
                
    //             return source
    //         }
            
    //     }
    //     else{
            
    //         //("didn't enter")
    //         return source
    //     }
        
    // }
    
    
    
    scientific_operation(source){
        var resultvalue = new Decimal("0.0");
        var input = source;//sin60,sqrt4,log
        
        input = input.replaceAll("--", "+");
        input = input.replaceAll("+", " +");
        input = input.replaceAll("-", " -");
        input = input.replaceAll("/", " /");
        input = input.replaceAll("*", " *");
        input = input.replaceAll("^", " ^ ");
        input = input.replaceAll("sin", " sin");
        input = input.replaceAll("log", " log");
        input = input.replaceAll("cos", " cos");
        input = input.replaceAll("tan", " tan");
        input = input.replaceAll("sqr", " sqr");
        input = input.replaceAll("sin -", "sin-");
        input = input.replaceAll("cos -", "cos-");
        input = input.replaceAll("tan -", "tan-");
        input = input.replaceAll("a sin", "asin");
        input = input.replaceAll("a cos", "acos");
        input = input.replaceAll("a tan", "atan");
        input = input.replaceAll("(", " ( ");
        input = input.replaceAll(")", " ) ");
        
        let elements = input.split(' ');
        elements = elements.filter(item => item !== "");
    
        //(elements)
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].includes("asin")) {
                if (this.isFloat(elements[i].replaceAll("asin", ""))){
                    elements[i] = elements[i].replaceAll("asin", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.asin(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("acos")) {
                if (this.isFloat(elements[i].replaceAll("acos", ""))){
                    elements[i] = elements[i].replaceAll("acos", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.acos(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("atan")) {
                if (this.isFloat(elements[i].replaceAll("atan", ""))){
                    elements[i] = elements[i].replaceAll("atan", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.atan(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("sin")) {
                if (this.isFloat(elements[i].replaceAll("sin", ""))){
                    elements[i] = elements[i].replaceAll("sin", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.sin(arg));
                    elements[i] = resultvalue.toString();
                }
            }
           
            if (elements[i].includes("cos")) {
                if (this.isFloat(elements[i].replaceAll("cos", ""))){
                    elements[i] = elements[i].replaceAll("cos", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.cos(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("tan")) {
                if (this.isFloat(elements[i].replaceAll("tan", ""))){
                    elements[i] = elements[i].replaceAll("tan", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.tan(arg));
                    elements[i] = resultvalue.toString();
                }
            }
               
            if (elements[i].includes("sqrt")) {
                if (this.isFloat(elements[i].replaceAll("sqrt", ""))){
                    elements[i] = elements[i].replaceAll("sqrt", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.sqrt(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            //http://swift.tecc0.com/?p=105
            if (elements[i].includes("abs")) {
                if (this.isFloat(elements[i].replaceAll("abs", ""))){
                    elements[i] = elements[i].replaceAll("abs", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.abs(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("exp")) {
                if (this.isFloat(elements[i].replaceAll("exp", ""))){
                    elements[i] = elements[i].replaceAll("exp", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.exp(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("logb")) {
                if (this.isFloat(elements[i].replaceAll("logb", ""))){
                    elements[i] = elements[i].replaceAll("logb", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.log2(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("logd")) {
                if (this.isFloat(elements[i].replaceAll("logd", ""))){
                    elements[i] = elements[i].replaceAll("logd", "");
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.log10(arg));
                    elements[i] = resultvalue.toString();
                }
            }
            
            if (elements[i].includes("log")) {
                if (this.isFloat(elements[i].replaceAll("log", ""))){
                    elements[i] = elements[i].replaceAll('log', '');
                    let arg = new Decimal(elements[i]);
                    resultvalue = new Decimal(Math.log(arg));
                    elements[i] = resultvalue.toString();
                }
            }
        }
        
        return elements.join('');
    }
    
    isFloat(str) {
        return /^-?\d+(\.\d+)?$/.test(str);
    }  

    basic_operation(source){
        
        var resultvalue = new Decimal("0.0");
        var input = source;
        
        input = input.replaceAll("--" , "+");
        input = input.replaceAll("+" , " ");
        input = input.replaceAll("/" , " / ");
        input = input.replaceAll("-" , " -");
        input = input.replaceAll("*" , " * ");
        input = input.replaceAll("^" , " ^ ");
        
        let elements = input.split(' ');
        elements = elements.filter(item => item !== "");
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == "^" &&  typeof elements[i-1] !== "undefined" && this.isFloat(elements[i-1]) && typeof elements[i+1] !== "undefined" && this.isFloat(elements[i+1])) {
                // if(this.isFloat(elements[i+1])){
                    // elements[i+1] = "error";
                    // elements[i-1] = "nil";
                    // elements[i] = "nil";
                    //error
                // }
                // else{                    
                    let a = new Decimal(elements[i-1]);
                    let b = new Decimal(elements[i+1]);
                    var c = Math.pow(a, b);
                    elements[i+1] = c.toString();
                    elements[i-1] = "nil";
                    elements[i] = "nil";
                // }                
            }
            
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
        
        elements = elements.filter(function(item) {
            return item !== "nil";
        });
          
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
    }
}

module.exports = {
    Service,
};