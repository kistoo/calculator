//basic operations
function sum(a, b) {
    a = parseInt(a);
    b = parseInt(b);
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === "0") {
        return "ERROR";
    } else {
        return a / b;
    }
}

function round(n) {
    n = Math.round(n * 10000) / 10000;
    return n;
}

//function for operations
function operate(operation, number1, number2) {
    switch(operation){
        case "+":
            return sum(number1, number2);
        case "-":
            return subtract(number1, number2);
        case "*":
            return multiply(number1, number2);
        case "/":
            return divide(number1, number2);
    }
}

//create function to evaluate
function evaluate() {
    const length = displayContent.length;
    if (length === 1) { //returns same number
        result = displayContent[0];
    } else if (getLastType() === "op") { //operates with same number
        result = operate(displayContent[length-1], displayContent[length-2], displayContent[length-2]);
    } else { //operates last 3 items
        result = operate(displayContent[length-2], displayContent[length-3], displayContent[length-1]);
    }
    if (result === "ERROR"){
        displayContent = ["ERROR"];
    } else {
        result = round(result);
        displayContent.push(`${result}`);
    }
}

//display interaction with buttons
function display(input) {
    if (displayContent[0] === "ERROR") {
        reset();
    }
    if (input === "CA") {
        reset();
        equalUse = false;
    } else if (input === "C") {
        removeLast();
        equalUse = false
    } else if (input === "=") {
        evaluate();
        reset(result);
        equalUse = true;
    } else {
        filterContent(input);
        equalUse = false;
    }
    filterDisplay();
    displayDiv.textContent = displayVisible;
}

//create reset for the displayContent
function reset(content="0") {
    displayContent = [];
    displayContent.push(`${content}`);
}

//create a display filter
function filterDisplay() {
    if (displayContent.length === 1) {
        displayVisible = displayContent[0];
    } else { //at least 2 items in displayContent
        if (getLastType() === "number") { // shows only number
            displayVisible = `${displayContent[displayContent.length-1]}`;
        } else if (getLastType() === "op") { // shows number and op
            displayVisible = `${displayContent[displayContent.length-2]}${displayContent[displayContent.length-1]}`;
        }
    }
}


//create a filter for content
function filterContent(input) {
    const current = inputValues.find(item => item.value === input);
    const lastType = getLastType();
    switch(current.type) {
        case "number":
            if ((displayContent[0] === "0") && (displayContent.length === 1)) {
                if (current.value !== "0") {
                    displayContent[0] = `${current.value}`;
                }
            } else {
                if (lastType === "number") {
                    if (equalUse === false) {
                        if ((displayContent[displayContent.length - 1].includes(".") === false) ||
                        current.value !== ".") { //evaluates that number doesnt have 2 "."
                            displayContent[displayContent.length - 1] +=`${current.value}`;
                        }
                    } else {
                        reset(current.value);
                    }
                } else if (lastType === "op") {
                    displayContent.push(`${current.value}`);
                }
            }
            break;
        case "op":
            if (lastType === "number") {
                if (displayContent.length >= 3) {
                    evaluate();
                }
                displayContent.push(`${current.value}`);
            } else if (lastType === "op") {
                removeLast();
                displayContent.push(`${current.value}`);
            }
            break;
    }
}
//gets last item
function getLastItem() {
    return displayContent[displayContent.length - 1];
}

//remove last item
function removeLast() {
    if (displayContent.length === 1) {
        displayContent[0] = "0";
    } else {
        const lastItem = getLastItem();
        if (lastItem.length === 1) {
            displayContent.pop();
        } else {
            lastItem.substring(0,lastItem.length-1);
        }
    }
}
//looks for last item type
function getLastType() {
    const lastItem = getLastItem();
    const lastValue = lastItem.slice(lastItem.length - 1);
    const last = inputValues.find(item => item.value === lastValue);
    return last.type;
}

//create array with buttons as objects
function initButton(value) {
    const button = {
        value,
    }
    //numbers
    if (((value>=0) && (value<10)) ||
    (value === ".")) {
        button.type = "number";
    } else if ((value === "+") || //operations
    (value === "-") || 
    (value ===  "*") || 
    (value === "/")) {
        button.type = "op";
    }
    //CA, C and = dont need type
    inputValues.push(button);
}

//variables and constants
const inputValues = []
let displayContent = ["0"];
let displayVisible = "";
let result = 0;
let equalUse = false;

const displayDiv = document.getElementById("display");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => 
        display(button.textContent));
        initButton(button.textContent);
});
