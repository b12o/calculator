$(document).ready(function () {
    calculateInput();
});

var calculate = "",
    currentEntry = "",
    result = "";

function calculateInput() {
    $(".button").on("click", function () {

        if (this.id.match(/\d/)) { // a number
            currentEntry += this.id.match(/\d/)[0];
            $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
            console.log("calculation: " + calculate + ", current entry: " + currentEntry);
        }
        else {
            // clear entire input
            if ((calculate.length !== 0 || currentEntry !== 0) && this.id === "button_ac") {
                calculate = "";
                currentEntry = "";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                console.log("calculation: " + calculate + ", current entry: " + currentEntry);
            }

            else if (currentEntry.length === 0 && this.id === "button_dot") {
                currentEntry = "0.";
                $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
            }

            else if (currentEntry.length !== 0) {
                switch (this.id) {
                    case "button_ce":
                        currentEntry = "";
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
                        if (!isDecimal(currentEntry)) currentEntry += ".";
                        $(".all-entries").html("<h2>" + calculate + currentEntry + "</h2>");
                        break;
                    case "button_enter":
                    case "button_hide_enter":
                        calculate += currentEntry;
                        console.log("calculation: " + calculate);
                        result = "todo";
                        console.log(result);
                        calculate = "";
                        currentEntry = "";
                        break;
                }
                console.log("calculation: " + calculate + ", current entry: " + currentEntry);
            }
        }
    });
}

function isDecimal(val) {
    return (val.match(/\./) !== null && val.match(/\./)[0].length === 1);
}