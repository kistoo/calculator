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
function display(input){
    if (input === "CA") {
        displayContent = ["0"];
    } else if (input === "C") {
        removeLast();
    } else if (input === "=") {
        displayContent.push(`${result}`);
    } else {
        filterContent(input);
    }
    displayDiv.textContent = `${displayContent}`;
}

//create a filter for display
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
                    displayContent[displayContent.length - 1] +=`${current.value}`;
                } else if (lastType === "op") {
                    displayContent.push(`${current.value}`);
                }
            }
            break;
        case "op":
            if (lastType === "number") {
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
    if ((value>=0) && 
        (value<10)) {
            button.type = "number";
    } else if ((value==="+") || //operations
        (value==="-") || 
        (value==="*") || 
        (value==="/")) {
            button.type = "op";
    }
    //CA, C and = dont need type
    inputValues.push(button);
}

//variables and constants
const inputValues = []
let displayContent = ["0"];
let result = 0;

const displayDiv = document.getElementById("display");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => 
        display(button.textContent));
        initButton(button.textContent);
});
