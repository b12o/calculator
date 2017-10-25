$(document).ready(function () {
    calculateInput();
});

var calculate = "",
    currentEntry = "", previousEntry = "",
    result = "";

var calculationFinished = false;

function calculateInput() {
    $(".button").on("click", function () {

        if (this.id.match(/\d/)) { // a number
            currentEntry += this.id.match(/\d/)[0]
            previousEntry = currentEntry;
            $(".entry").html("<h1>" + previousEntry + "</h1>");
            $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
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
                        break;
                    case "button_div":
                        calculate += currentEntry;
                        calculate += " / ";
                        currentEntry = "";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
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
            // when calculation is finished, CE has same functionality as AC
            if (calculationFinished && this.id === "button_ce") {
                calculate = "";
                currentEntry = "";
                previousEntry = "";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                $(".entry").html("<h1>" + previousEntry + "</h1>");
                calculationFinished = false;
            }
        }
    });
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