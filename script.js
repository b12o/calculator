$(document).ready(function () {
    calculateInput();
    // hover animation begin
    $(".button").hover(function() {
        // entering
        if (this.id !== "button_hide_enter") {
            $(this).css({"box-shadow": "0 0 0.5rem rgb(30, 30, 30)"}, 100);
        }
        else {
            $("#button_enter").css({"box-shadow": "0 0 0.5rem rgb(30, 30, 30)"}, 100);
        }
    }, function () {
        // leaving
        $(this).css({"box-shadow": ""}, 100);
        if (this.id === "button_hide_enter") {
            $("#button_enter").css({"box-shadow": ""}, 100);
        }
    });
    // hover animation end
});

let calculate = "",
    currentEntry = "",
    previousEntry = "",
    result = "";
let calculationFinished = false, // for post-result operations
    potentialMinusOperation = false; // to allow potential negative numbers

function calculateInput() {
    $(".button").on("click", function () {
        // user types in a number
        if (this.id.match(/\d/)) {
            currentEntry += this.id.match(/\d/)[0];
            previousEntry = currentEntry;
            if (potentialMinusOperation) potentialMinusOperation = false; // since no minus operation has been done.
            renderAll();
        }
        else {
            // clear entire input
            if ((calculate.length !== 0 || currentEntry !== 0) && this.id === "button_ac") {
                calculate = "";
                currentEntry = "";
                previousEntry = "";
                renderAll();
            }
            // first element is a dot, so put a "0" in front of it
            else if (currentEntry.length === 0 && this.id === "button_dot") {
                currentEntry = "0.";
                previousEntry = "0.";
                if (potentialMinusOperation) potentialMinusOperation = false;
                renderAll();
            }
            // determine which button was pressed in order to perform the correct calculation
            else if (currentEntry.length !== 0) {
                if (this.className === "button button-operator") {
                    calculate += currentEntry + this.dataset.value;
                    currentEntry = "";
                    renderSecondary(calculate);
                    if (this.id === "button_mult" || this.id === "button_div") potentialMinusOperation = true;
                }
                else switch (this.id) {
                    case "button_ce": // only clear current entry, not entire calculation
                        previousEntry = "";
                        currentEntry = "";
                        renderAll();
                        break;
                    case  "button_dot":
                        if (currentEntry.match(/\./) === null) {
                            currentEntry += ".";
                            previousEntry += ".";
                        }
                        renderAll();
                        break;
                    case "button_enter":
                    case "button_hide_enter":
                        calculate += currentEntry;
                        result = stringToCalculation(calculate);
                        previousEntry = result;
                        renderResult(result);
                        calculationFinished = true;
                        calculate = "";
                        currentEntry = "";
                        break;
                }
            }
            // of the potential minus flag is set to true, allow "-" to be pressed
           if (potentialMinusOperation && this.id === "button_minus") {
                calculate += " - ";
               renderSecondary(calculate + currentEntry);
                potentialMinusOperation = false;
            }
            // post-calculation options
            if (calculationFinished) {
                if (this.id === "button_ce") {
                    // when calculation is finished, CE has same functionality as AC
                    calculate = "";
                    currentEntry = "";
                    previousEntry = "";
                    renderAll();
                    calculationFinished = false;
                }
                if (this.className === "button button-operator") {
                    // use result for next calculation
                    calculate = previousEntry + this.dataset.value;
                    renderSecondary(calculate + currentEntry);
                    calculationFinished = false;
                    // allowing for negative operations
                    if (this.id === "button_mult" || this.id === "button_div") {
                        potentialMinusOperation = true;
                    }
                }
            }
        }
    });
}
// render main and secondary screen
function renderAll() {
    $(".entry").html("<h1>" + previousEntry + "</h1>");
    if (calculate.length + currentEntry.length > 34) {
        $(".all-entries").html("<h2> calculation overflow</h2>");
    }
    else $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
}
// mainly to account for calculation overflow
function renderSecondary(val) {
    if (calculate.length + currentEntry.length > 34) {
        $(".all-entries").html("<h2> calculation overflow </h2>");
    }
    else $(".all-entries").html("<h2>" + val + "</h2>");
}

// render result
function renderResult(result) {
    if (result.toString().length > 17) renderError();
    else {
        $(".entry").html("<h1>" + previousEntry + "</h1>");
        if (calculate.length + currentEntry.length + result > 34) {
            $(".all-entries").html("<h2>" + result + "</h2>");
        }
        else $(".all-entries").html("<h2>" + calculate + " = " + result + "</h2>");
    }
}
function renderError() {
    $(".entry").html("<h1>ERROR</h1>");
    $(".all-entries").html("<h2>OVERFLOW ERROR</h2>");
}
// takes calculation in string form, converts to mathematical calculation and returns result
function stringToCalculation(string) {
    let newString = string.replace(/x/g, "*"); // eval does not accept "x" as multiplication, only "*"
    newString = newString.replace(/÷/g, "/"); // same goes for division icon
    let result = eval(newString);
    return Math.round(result * 100) / 100; // handling for JS floating point weirdness
}