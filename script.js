$(document).ready(function () {
    calculateInput();
});

var calculate = "",
    currentEntry = "", previousEntry = "",
    result = "";

var calculationFinished = false, // for post-result operations
    potentialMinusOperation = false; // to allow potential negative numbers

function calculateInput() {
    $(".button").on("click", function () {

        if (this.id.match(/\d/)) { // a number
            currentEntry += this.id.match(/\d/)[0]
            previousEntry = currentEntry;
            $(".entry").html("<h1>" + previousEntry + "</h1>");
            $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");

            if (potentialMinusOperation) potentialMinusOperation = false; // since no minus operation has been done.

        }
        else {
            // clear entire input
            if ((calculate.length !== 0 || currentEntry !== 0) && this.id === "button_ac") {
                calculate = "";
                currentEntry = "";
                previousEntry = "";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                $(".entry").html("<h1>" + previousEntry + "</h1>");
            }

            else if (currentEntry.length === 0 && this.id === "button_dot") {
                currentEntry = "0.";
                previousEntry = "0.";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                $(".entry").html("<h1>" + previousEntry + "</h1>");
            }

            else if (currentEntry.length !== 0) {
                switch (this.id) {
                    case "button_ce":
                        previousEntry = "";
                        currentEntry = "";
                        $(".entry").html("<h1>" + previousEntry + "</h1>");
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        break;
                    case "button_plus":
                        calculate += currentEntry;
                        calculate += " + ";
                        currentEntry = "";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        break;
                    case "button_minus":
                        calculate += currentEntry;
                        calculate += " - ";
                        currentEntry = "";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        break;
                    case "button_mult":
                        calculate += currentEntry;
                        calculate += " x ";
                        currentEntry = "";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        potentialMinusOperation = true;
                        break;
                    case "button_div":
                        calculate += currentEntry;
                        calculate += " / ";
                        currentEntry = "";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        potentialMinusOperation = true;
                        break;
                    case  "button_dot":
                        if (!isDecimal(currentEntry)) {
                            currentEntry += ".";
                            previousEntry += ".";
                        }
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        $(".entry").html("<h1>" + previousEntry + "</h1>");
                        break;
                    case "button_enter":
                    case "button_hide_enter":
                        calculate += currentEntry;
                        result = stringToCalculation(calculate);
                        previousEntry = result;
                        if (result.toString().length > 18) {
                            $(".entry").html("<h1>ERROR</h1>");
                            $(".all-entries").html("<h2>OVERFLOW ERROR</h2>");
                        } else {
                            $(".entry").html("<h1>" + previousEntry + "</h1>");
                            $(".all-entries").html("<h2>" + calculate + " = " + result + "</h2>");
                        }
                        calculationFinished = true;
                        calculate = "";
                        currentEntry = "";
                        break;
                }
            }

            if (potentialMinusOperation && this.id === "button_minus") {
                calculate += " - ";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                potentialMinusOperation = false;
            }

            // post-calculation options
            if (calculationFinished) {
                if (this.id === "button_ce") {
                    // when calculation is finished, CE has same functionality as AC
                    calculate = "";
                    currentEntry = "";
                    previousEntry = "";
                    $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                    $(".entry").html("<h1>" + previousEntry + "</h1>");
                    calculationFinished = false;
                }
                if (this.id === "button_plus" || this.id === "button_minus" ||
                    this.id === "button_mult" || this.id === "button_div") {
                    // use result for next calculation
                    calculate = previousEntry + getOperationFromButton(this.id);
                    $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                    calculationFinished = false;

                    if (this.id === "button_mult" || this.id === "button_div") { // allowing for negative operations
                        potentialMinusOperation = true;
                    }
                }
            }
        }
    });
}

function getOperationFromButton(button) {
    switch (button) {
        case "button_plus": return " + ";
        case "button_minus": return " - ";
        case "button_mult": return " x ";
        case "button_div": return " / ";
    }
}

function isDecimal(val) {
    return (val.match(/\./) !== null);
}
// takes calculation in string form, converts to mathematical calculation and returns result
function stringToCalculation(string) {
    var newString = string.replace(/x/g, "*"); // eval does not accept "x" as multiplication, only "*"
    var result = eval(newString);
    return Math.round(result * 100) / 100; // handling for JS floating point weirdness
}