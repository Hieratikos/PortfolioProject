/**
 * Created by Admin on 6/8/2017.
 */
$(document).ready(function () {
   //stores the expression from the user to calculate later
    var expression = [];
    //instead of having the display render static HTML, I want "expression" to hold the initial value so all validation can focus just on "expression"
    expression.push(0);
    updateEntry();
    //string to store input string
    var totalValue = "";
    //operators array for validation without the "."
    var operators = ["+", "-", "/", "*"];
    //operators array with the "." for validation
    var decimalPoint = ["."];
    //numbers for validation
    var nums = [0,1,2,3,4,5,6,7,8,9];
    //keep track of when the decimal is allowed and not
    var hasDecimal = false;
    //dynamically style the display to fit an oversized error message
    var css_error = { "font-size" : "x-large" };
    var css_reset = { "font-size" : "40px" };

    function addEntry(data) {
        expression.push(data);
    }
    //sets the current value
    function updateEntry() {
        //join() joins all elements of an array and returns string
        if (expression.length > 15){
            $("#display").html("Display longer than 15");
            $("#display").css(css_error);
        }else {
            totalValue = expression.join("");
            $("#display").html(totalValue);
        }
    }
    function getTotal() {
        totalValue = expression.join("");
        //eval() evaluates a formula in the form of an string and returns a number. why bother with datatypes at all?
        $("#display").html(eval(totalValue));
    }
    //when clicking on an anchor tag, run this function
    $("a").click(function () {
        if ($(this).hasClass("ops")){
            //if an operator is clicked, verify that the last item in expression is a number before adding the entry
            //if a decimal is the last char, remove it from the expression before updating the display
            if (decimalPoint.includes(expression[expression.length-1])){
                expression.pop();
            }
            //if an operator is clicked, and either 1) the last character entered was also an operator, or 2) only the zero is in the display, return out
            if (operators.includes(expression[expression.length-1]) || $("#display")[0].textContent === "0"){
                return;
            }
            hasDecimal = false;
        }
        if ($(this).hasClass("dec")){
            //if the decimal point is entered, verify that no other decimals appear UNLESS an operator appears first
            if (operators.includes(expression[expression.length-1]) === true && hasDecimal === false){
                addEntry(this.id);
                updateEntry();
                hasDecimal = true;
                return;
            }
            //if a decimal is the last character in the display, or if a decimal has already been entered in the current value (before an operator has been chosen), return out
            else if (decimalPoint.includes(expression[expression.length-1]) === true || hasDecimal === true){
                return;
            }
            hasDecimal = true;
        }
       if (this.id === "deleteAll"){
           expression = [];
           expression.push(0);
           $("#display").css(css_reset);
           updateEntry();
           hasDecimal = false;
       }
       //I didn't bother to make the CE button work all that well
       else if (this.id === "clearEntry"){
           expression.pop();
           if (expression.length === 0){
               expression.push(0);
           }
           updateEntry();
       }
       else if (this.id === "total"){
           if (decimalPoint.includes(expression[expression.length-1]) === true){
               return;
           }else {
               getTotal();
           }
       }
       else{
           if (expression.length === 1 && expression[expression.length-1] === 0){
               expression.pop();
           }
           addEntry(this.id);
           updateEntry();
       }
    });
});