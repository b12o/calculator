$(document).ready(function () {
    testWrite();
});

var calculate = "",
    currentEntry = "";

function testWrite() {
    $(".button").on("click", function () {
        if (this.id.match(/\d/)) {
            currentEntry += this.id.match(/\d/)[0];
            console.log("calculation: " + calculate + ", current entry: " + currentEntry);
        }
        if (!this.id.match(/\d/) && currentEntry.length !== 0) {
            switch (this.id) {
                case "button_ac":
                    currentEntry = "";
                    break;
                case "button_ce":
                    calculate = "";
                    currentEntry = "";
                    break;
                case "button_plus":
                    calculate += currentEntry;
                    calculate += " + ";
                    currentEntry = "";
                    break;
                case "button_minus":
                    calculate += currentEntry;
                    calculate += " - ";
                    currentEntry = "";
                    break;
                case "button_mult":
                    calculate += currentEntry;
                    calculate += " * ";
                    currentEntry = "";
                    break;
                case "button_div":
                    calculate += currentEntry;
                    calculate += " / ";
                    currentEntry = "";
                    break;
                case "button_enter":
                case "button_hide_enter":
                    calculate += currentEntry;
                    console.log("calculation: " + calculate);
                    console.log("todo");
                    calculate = currentEntry = "";
            }
            console.log("calculation: " + calculate + ", current entry: " + currentEntry);
        }
    });
}

