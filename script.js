//basic operations
function sum (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide (a, b) {
    return a / b;
}

//function for operations
function operate (operation, number1, number2) {
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

//display interaction with buttons
function display(button){
    if (button === "CA") {
        displayContent = "0";
    } else if (button === "C") {
        displayContent = displayContent.substring(0,displayContent.length-1);
    } else if (button === "=") {
        displayContent = `${result}`;
    } else {
        displayContent += button;
    }
    displayDiv.textContent = displayContent;
}

//Create array with buttons as objects
function initButton(value) {
    const button = {
        value,
    }
    //numbers
    if ((value>0) && 
        (value<10)) {
            button.type = "number";
    } else if ((value==="+") || //operations
        (value==="-") || 
        (value==="*") || 
        (value==="/")) {
            button.type = "op";
    } else if (value===0) { //zero
        button.type = "zero";
    }
    //CA, C and = dont need type
    inputValues.push(button);
}

//variables and constants
const inputValues = []
let displayContent = "0";
let result = 0;

const displayDiv = document.getElementById("display");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => 
        display(button.textContent));
        initButton(button.textContent);
});

console.log(inputValues);