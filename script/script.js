const inpEl = document.querySelector("#Input");
const tbodyEl = document.querySelector("tbody");
const ansEl = document.querySelector("#solutionDiv");
var row = 0;
var col = 0;
// var inpBox = `<input type="text" name>`;

var myInterval = setInterval(update, 1000);

// Data Variables

var data = [];
var supply = [];
var demand = [];

// getting the Inputs--------------------------------------------------------------------------------------------------------

function initalizeData() {
    //initializes the data arrays with 0
    for (i = 0; i < row - 1; i++) {
        data[i] = [];
        for (j = 0; j < col - 1; j++) {
            data[i][j] = 0;
        }
    }

    for (i = 0; i < row - 1; i++) {
        supply[i] = 0;
    }

    for (i = 0; i < col - 1; i++) {
        demand[i] = 0;
    }

    // alert(data);
    delete i;
    delete j;
}

function update() {
    //updates the arrays with right values
    for (i = 0; i < row - 1; i++) {
        data[i] = [];
        for (j = 0; j < col - 1; j++) {
            x = getVal(i + 1, j + 1);
            data[i][j] = x;
        }
    }

    for (i = 0; i < row - 1; i++) {
        x = getVal("s", i + 1);
        supply[i] = x;
    }

    for (i = 0; i < col - 1; i++) {
        x = getVal("d", i + 1);
        demand[i] = x;
    }

    // alert(data);
}

function getVal(r, c) {
    //get values fromt the input boxes
    n = "" + r + c;
    x = document.getElementById(n);
    return x.value;
}

function inpBox(name) {
    //maeks an input bo with proper ID
    return `<input type="text" id=${name}>`;
}

function createGrid() {
    tbodyEl.innerHTML = "";
    row = parseInt(document.getElementById("rowInp").value) + 1;
    col = parseInt(document.getElementById("colInp").value) + 1;

    initalizeData();

    for (j = 1; j <= row; j++) {
        if (j == 1) {
            addTitleRow(tbodyEl, col);
        }
        if (j == row) {
            lastRow(tbodyEl, col);
            break;
        }

        addRow(tbodyEl, col, j);
    }

    delete j;
}

function addTitleRow(el, c) {
    let toAdd = "";
    toAdd += `<tr>`;
    for (i = 1; i <= c; i++) {
        if (i == 1) {
            toAdd += addCol("", "d", "dataHead");
        }
        if (i == c) {
            toAdd += addCol("Supply", "h", "dataHead");
            break;
        }

        toAdd += addCol("D" + i, "h", "dataHead");
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    delete i;
    return;
}

function addRow(el, c, idx) {
    let toAdd = "";
    toAdd += `<tr>`;
    for (i = 1; i <= c; i++) {
        if (i == 1) {
            toAdd += addCol("S" + idx, "h", "dataHead");
        }
        if (i == c) {
            toAdd += addCol(inpBox("s" + idx), "d", "dataSupply");
            break;
        }

        toAdd += addCol(inpBox("" + idx + i), "d", "dataBody");
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    delete i;
    return;
}

function lastRow(el, c) {
    let toAdd = "";

    toAdd += `<tr>`;
    for (i = 1; i <= c; i++) {
        if (i == 1) {
            toAdd += addCol("Demand", "h", "dataHead");
        }
        if (i == c) {
            toAdd += addCol("", "h", "dataHead");
            break;
        }

        toAdd += addCol(inpBox("d" + i), "d", "dataDemand");
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    delete i;
    return;
}

function addCol(matter, head, cls) {
    return `<t${head} class='${cls}'>${matter}</t${head}>`;
}

function display() {
    toAdd = "";

    toAdd += `<table class="table table-striped">`;
    for (j = 1; j <= row; j++) {
        if (j == 1) {
            toAdd += `<tr>`;
            for (i = 1; i <= col; i++) {
                if (i == 1) {
                    toAdd += addCol("", "d", "dataHead");
                }
                if (i == col) {
                    toAdd += addCol("S", "h", "dataHead");
                    break;
                }

                toAdd += addCol("D" + i, "h", "dataHead");
            }
            toAdd += `</tr>`;
        }

        if (j == row) {
            toAdd += `<tr>`;
            for (i = 1; i <= col; i++) {
                if (i == 1) {
                    toAdd += addCol("D", "h", "dataHead");
                }
                if (i == col) {
                    toAdd += addCol("", "h", "dataHead");
                    break;
                }

                toAdd += addCol(demand[i - 1], "d", "dataDemand");
            }
            toAdd += `</tr>`;
            break;
        }

        toAdd += `<tr>`;
        for (i = 1; i <= col; i++) {
            if (i == 1) {
                toAdd += addCol("S" + j, "h", "dataHead");
            }
            if (i == col) {
                toAdd += addCol(supply[j - 1], "d", "dataSupply");
                break;
            }

            toAdd += addCol(data[j - 1][i - 1], "d", "dataBody");
        }
        toAdd += `</tr>`;
    }

    toAdd += "</table>";
    ansEl.innerHTML += toAdd;
}
