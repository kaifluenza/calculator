function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b==0){
        alert("Can't divide by 0!");
    }else{
        return a/b;
        //make sure result is 3 decimal places at most
    }
}

function evaluate(op,a,b){
    switch(op){
        case '+':
            return Number(add(a,b).toFixed(3));
            break;
        case '-':
            return Number(subtract(a,b).toFixed(3));
            break;
        case '*':
            return Number(multiply(a,b).toFixed(3));
            break;
       default:
            //divide
            return Number(divide(a,b).toFixed(3));
    }
}

function updateExpression(text){
    displayExpression.textContent = text;
}
function updateResult(text){
    displayResult.textContent = text;
}


let num1=null,
    num2=null,
    operator=null,
    expression="",
    result=0,
    evaluated=false;
    

const displayExpression = document.querySelector('.expression');
const displayResult = document.querySelector('.result');

const container = document.querySelector('.buttons');


document.addEventListener("keydown",(event)=>{
    let keyValue;
    if(event.key=="Shift"){
        return;
    }else{
        keyValue=event.key;
    }
    if(event.shiftKey){ //shift was pressed with some key
        //console.log(`combination of shift and ${event.key}`);
        keyValue=event.key;
    }
    console.log(keyValue);
    
    if(Number.isFinite(+keyValue)){
        if(operator==null){ //no operator yet, entering num1
            if(num1==null) num1= Number(keyValue); //fisrt time user entering a num
            else num1= Number(`${num1}${keyValue}`); //append to existing num1
            console.log("num1 is",num1);
            expression=num1;
            updateExpression(expression);
        }else{ //already has entered an operator
            if(num2==null) num2=Number(keyValue);
            else num2= Number(`${num2}${keyValue}`); //append to existing num2
            console.log("num2 is",num2);
            expression = `${num1} ${operator} ${num2}`;
            updateExpression(expression);
        }
    }else if(keyValue=="+"||keyValue=="-"||keyValue=="*"||keyValue=="/"){
        //there exists an expression to be evaluated before new operation
        if(Number.isFinite(num1)&&Number.isFinite(num2)&&operator!=""){
            result=evaluate(operator,num1,num2);
            expression=result;
            updateExpression(expression);
            updateResult(result);
            evaluated=true;
            num1=result;
            num2=null;
        }else if(num1==null){
            num1=0;
            expression=num1;
            updateExpression(expression);
        }
        operator = keyValue;
        evaluated=false;
        console.log("operator is",keyValue);
        updateExpression(expression+operator);
    }else if(keyValue=="="){
        if(Number.isFinite(num1)&&Number.isFinite(num2)&&operator!=""){
            result = evaluate(operator,num1,num2);
            console.log(`${num1} ${operator} ${num2} = ${result}`);
            expression = expression+" =";
            updateExpression(expression);
            updateResult(result);
            evaluated=true;
        }
    }else if(keyValue=="Backspace"){
        if(evaluated){ //deleting current result
            result = Number(String(result).slice(0,-1));
            console.log("current result",result);
            updateResult(result);
            //reset num2 and operator, set num1 = current result, 
            num1=result;
            expression=num1;
            num2=null;
            operator=null;
        }else{//deleting either num2 or num1 in expression
            if(Number.isFinite(num2)&&Number.isFinite(num1)){
                num2 = Number(String(num2).slice(0,-1));
                if(num2==0)num2="";
                console.log("num2 is now",num2);
                expression=`${num1} ${operator} ${num2}`;
                updateExpression(expression);
            }else if(Number.isFinite(num1)&&num2==null){ //there is only num1
                num1 = Number(String(num1).slice(0,-1));
                console.log("num1 is now",num1);
    
                if(operator==null) {
                    expression=num1;
                    updateExpression(num1);}
                else {
                    expression=`${num1} ${operator}`;
                    updateExpression(expression);}
            }
        }
    }else if(keyValue=="."){
        if(operator==null){ //no operator yet, entering num1
            if(num1==null) num1= "0."; //fisrt time user entering a num
            else {
                if(!(String(num1).includes("."))) {
                    num1= `${num1}.`; //append to existing num1, only if num doesn already  have decimal
                } 
            }
            console.log("num1 is",num1);
            expression=num1;
            updateExpression(expression);
        }else{ //already has entered an operator
            if(num2==null) num2="0.";
            else {
                if(!(String(num2).includes("."))){
                    num2= `${num2}.`; //append to existing num2
                }
                
            }
            console.log("num2 is",num2);
            expression = `${num1} ${operator} ${num2}`;
            updateExpression(expression);
        }
    }

});


container.addEventListener('click',(event)=>{
    let btnID = event.target.id;
    let btnClass = event.target.className;

    if(btnClass=="number"){
        if(operator==null){ //no operator yet, entering num1
            if(num1==null) num1= Number(btnID); //fisrt time user entering a num
            else num1= Number(`${num1}${btnID}`); //append to existing num1
            console.log("num1 is",num1);
            expression=num1;
            updateExpression(expression);
        }else{ //already has entered an operator
            if(num2==null) num2=Number(btnID);
            else num2= Number(`${num2}${btnID}`); //append to existing num2
            console.log("num2 is",num2);
            expression = `${num1} ${operator} ${num2}`;
            updateExpression(expression);
        }
    }else if(btnClass=="operator"){
        //there exists an expression to be evaluated before new operation
        if(Number.isFinite(num1)&&Number.isFinite(num2)&&operator!=""){
            result=evaluate(operator,num1,num2);
            expression=result;
            updateExpression(expression);
            updateResult(result);
            evaluated=true;
            num1=result;
            num2=null;
        }else if(num1==null){
            num1=0;
            expression=num1;
            updateExpression(expression);
        }
        operator = btnID;
        evaluated=false;
        console.log("operator is",btnID);
        updateExpression(expression+operator);
    }else if(btnClass=="evaluate"){
        if(Number.isFinite(num1)&&Number.isFinite(num2)&&operator!=""){
            result = evaluate(operator,num1,num2);
            console.log(`${num1} ${operator} ${num2} = ${result}`);
            expression = expression+" =";
            updateExpression(expression);
            updateResult(result);
            evaluated=true;
        }
    }else if(btnClass=="clear"){
        num1=null;
        num2=null;
        operator=null;
        expression="";
        result=0;
        updateExpression(expression);
        updateResult(result);
    }else if(btnClass=="delete"){
        if(evaluated){ //deleting current result
            result = Number(String(result).slice(0,-1));
            console.log("current result",result);
            updateResult(result);
            //reset num2 and operator, set num1 = current result, 
            num1=result;
            expression=num1;
            num2=null;
            operator=null;
        }else{//deleting either num2 or num1 in expression
            if(Number.isFinite(num2)&&Number.isFinite(num1)){
                num2 = Number(String(num2).slice(0,-1));
                if(num2==0)num2="";
                console.log("num2 is now",num2);
                expression=`${num1} ${operator} ${num2}`;
                updateExpression(expression);
            }else if(Number.isFinite(num1)&&num2==null){ //there is only num1
                num1 = Number(String(num1).slice(0,-1));
                console.log("num1 is now",num1);
    
                if(operator==null) {
                    expression=num1;
                    updateExpression(num1);}
                else {
                    expression=`${num1} ${operator}`;
                    updateExpression(expression);}
            }
        }
    }else if(btnClass=="decimal"){
        if(operator==null){ //no operator yet, entering num1
            if(num1==null) num1= "0."; //fisrt time user entering a num
            else {
                if(!(String(num1).includes("."))) {
                    num1= `${num1}.`; //append to existing num1, only if num doesn already  have decimal
                } 
            }
            console.log("num1 is",num1);
            expression=num1;
            updateExpression(expression);
        }else{ //already has entered an operator
            if(num2==null) num2="0.";
            else {
                if(!(String(num2).includes("."))){
                    num2= `${num2}.`; //append to existing num2
                }
                
            }
            console.log("num2 is",num2);
            expression = `${num1} ${operator} ${num2}`;
            updateExpression(expression);
        }
    }

});






