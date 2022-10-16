const h = document.querySelector("#Input");
const tbodyEl = document.querySelector("tbody");
var row=0;
var col=0;
// var inpBox = `<input type="text" name>`;

function inpBox(name){
    return `<input type="text" name=${name}>`;
}

function createGrid(e) {
    tbodyEl.innerHTML = "";
    row = parseInt(document.getElementById("rowInp").value) +1;
    col = parseInt(document.getElementById("colInp").value) + 1;   

    for(j=1; j<=row; j++){
        if(j==1){
            addTitleRow(tbodyEl, col);
        }
        if(j==row){
            lastRow(tbodyEl, col);
            break;
        }

        addRow(tbodyEl, col, j);
    }
}

function addTitleRow(el, col){
    let toAdd = ""
    toAdd += `<tr>`;
    for(i=1; i<=col; i++){
        if(i==1){
            toAdd += addCol("", 'd', "dataHead");
        }
        if(i==col){
            toAdd += addCol("Supply", 'h', "dataHead");
            break;
        }
        
        toAdd += addCol('D'+i, 'h', "dataHead");  
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    return;
}

function addRow(el, col, idx){
    let toAdd="";
    toAdd += `<tr>`;
    for(i=1; i<=col; i++){
        if(i==1){
            toAdd += addCol("S"+idx, 'h', "dataHead");
        }
        if(i==col){
            toAdd += addCol(inpBox(idx), 'd', "dataSupply");
            break;
        }

        toAdd += addCol(inpBox(""+row+col), 'd', "dataBody");
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    return;
}

function lastRow(el, col){
    let toAdd = "";

    toAdd += `<tr>`;
    for(i=1; i<=col; i++){
        if(i==1){
            toAdd += addCol("Demand", 'h', "dataHead");
        }
        if(i==col){
            toAdd += addCol("", 'h', "dataHead");
            break;
        }
        
        toAdd += addCol(inpBox(i), 'd', "dataDemand");  
    }
    toAdd += `</tr>`;

    el.innerHTML += toAdd;
    return;
}

function addCol(matter, head, cls){
    return `<t${head} class='${cls}'>${matter}</t${head}>`;
}