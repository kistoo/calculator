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
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.addEventListener("click", () => display(button.textContent));
});

let displayContent = "";
const displayDiv = document.getElementById("display");


function display(button){
    if (button === "CA") {
        displayContent = "";
    } else if (button === "C") {
        displayContent = displayContent.substring(0,displayContent.length-1);
    } else {
        displayContent += button;
    }
    displayDiv.textContent = displayContent;
}