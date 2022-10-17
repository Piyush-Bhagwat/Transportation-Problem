const inpEl = document.querySelector("#Input");
const tbodyEl = document.querySelector("tbody");
const ansEl = document.querySelector("#solutionDiv");
const ansTextEl = document.querySelector("#ansText");
const allocEl = document.querySelector("#allocationDiv");

var row = 0;
var col = 0;
var rowAvil;
var colAvil;
var ans=0;

// var inpBox = `<input type="text" name>`;
var method = 0;
// Data Variables

var data = [];
var supply = [];
var demand = [];
var allocationVec = [];



function min(a, b){
    if(a<b){
        return a;
    }
    else if(a>b){
        return b;
    }
    return a;
}

function max(a, b){
    if(a<b){
        return b;
    }
    else if(a>b){
        return a;
    }
    return a;
}
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

function update() { //updates the arrays with right values
    method = document.querySelector("select").value;
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
}

function getVal(r, c) {//get values fromt the input boxes
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
    rowAvil = row-1;
    colAvil = col-1;

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

    toAdd += `<table class="table table-striped table-dark">`;
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
                if(demand[i-1]==-1){
                    toAdd += addCol('X', 'd',"dataCrossed");
                    continue;
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
                if(supply[j-1]==-1){
                    toAdd += addCol('X', 'd',"dataCrossed");
                    continue;
                }
                toAdd += addCol(supply[j - 1], "d", "dataSupply");
                break;
            }

            if(data[j-1][i-1]==-1){
                toAdd += addCol('X', 'd',"dataCrossed");
                continue;
            }

            toAdd += addCol(data[j - 1][i - 1], "d", "dataBody");
        }
        toAdd += `</tr>`;
    }

    toAdd += "</table>";
    ansEl.innerHTML += toAdd;

    delete i;
    delete j;
}




// Logics--------------------------------------------------------------------------------------------------------------------

function getSupply(pos){
    return parseInt(supply[pos]);
}

function setSupply(pos, valToSub){
    supply[pos]  -= valToSub;
}
function getDemand(pos){
    return parseInt(demand[pos]);
}

function setDemand(pos, valToSub){
    demand[pos] -= valToSub;
}

function getAllocations(r,c){ //get the allocation the pirticular cell
    return min(getSupply(r), getDemand(c));
}

function getRemaint(r, c){
    return max(getSupply(r), getDemand(c));
}

function solve(){
    ansEl.innerHTML = '';
    allocEl.innerHTML = '';
    ansTextEl.innerHTML = '';

    update(); //Problem: this wont update second time cause the supplyDemamndAdjust will change the no of row and col
    supplyDemandAdjust();
    display();

    if(method==1){
        NorthWestMethod();
    }
    else if(method==2){
        leastCostMethod();
    }
    else if(method==3){
        rowMinima();
    }
    else if(method==4){
        columnMinima();
    }
    
    showAnswer();
}

function supplyDemandAdjust(){
    let sup=0;
    let dem = 0;

    for(i=0; i<row-1; i++){
        sup += parseInt(supply[i]);
    }
    for(i=0; i<col-1; i++){
        dem += parseInt(demand[i]);
    }

    if(sup == dem){
        ansEl.innerHTML += `<h4>This Problem is Balanced(${dem})</h4>`;
        return;
    }

    if(dem<sup){
        toAdd = sup - dem;
        for(i=0; i<row; i++){       
            if(i == row-1){
                demand.push(toAdd);
                continue;
            }
            data[i][col-1] = 0;
        }
        
        col+=1;
        // cout<<"The demand("<<demand<<") < Supply("<<supply<<") so we have added a dummy column. To adjust Demand by "<<toAdd<<endl;
        ansEl.innerHTML += `<h5>The demand(${dem}) < Supply(${sup}) so We have added a dummy column. To adjust Demand by ${toAdd}</h5>`;
    }
    else if(sup<dem){
        toAdd = dem - sup;

        data.push([]);
        row++;

        for(i=0; i<col; i++){
            if(i == col-1){
                supply.push(toAdd);
                continue;
            }
            data[row-2][i] = 0;
        }

        // cout<<"The Supply("<<supply<<") < Demand("<<demand<<") so we have added a dummy row. To adjust supply by "<<toAdd<<endl;
        ansEl.innerHTML += `<h5>The demand(${dem}) > Supply(${sup}) so We have added a dummy Row. To adjust Supply by ${toAdd}</h5>`;
    }

    delete i;
}

function deleteCol(c){
    for(i=0; i<row-1; i++){
        data[i][c]=-1;
   }
   demand[c]=-1;
   delete i;
}

function deleteRow(r){
    for( i=0; i<col-1; i++){
        data[r][i]=-1;
    }
    supply[r]=-1;
    delete i;
    delete r;
}

function operation(r, c){ //Main operation on indivual Cells
    Allocation = getAllocations(r, c);
    ans += (Allocation * data[r][c]);

    setDemand(c, Allocation);
    setSupply(r, Allocation);

    if(getSupply(r) == 0){
        rowAvil--;
        deleteRow(r);
    }
    if(getDemand(c) == 0){
        colAvil--;
        deleteCol(c);
    }

    pos = [r, c];
    
    allocationVec.push([pos, Allocation]);
}

//  ---------------------North West Corner Cell------------------------------------------------------
function getNWC(){ //get the northWestCorner cell
    pr = [-1, -1];
    for(i=0; i<(row-1); i++){
        for(j=0; j<(col-1); j++){
            if(data[i][j] != -1){
                pr[0]=i;
                pr[1]=j;
                return pr;
            }
        }
    }
    delete i;
    delete j;
    return pr;
}

function NorthWestMethod(){ //Repeat the Opration in NWM method
    while(true){
        NWC = getNWC();
        r = NWC[0];
        c = NWC[1]; 
        operation(r, c);
        display();
        if(r==(row-2) && c==(col-2)) break;
    }
}

// ---------------------------------------------Least Cost Method ---------------------------------------------

function isFinished(){ //Returns true if the problem is solved 
    for(i=0; i<row-1; i++){
        for(j=0; j<col-1; j++){
            if(data[i][j] != -1) return false;
        }
    }

    delete i;
    delete j;
    return true;
}

function LCMCell(){
    minVal = 100000;
    prevAlloc=0;
    prevRemai=0;
    r=0, c=0;
    coordinates=[];

    for(i=0; i<row-1; i++){
        for(j=0; j<col-1; j++){
            if(data[i][j]==-1) continue;

            if(data[i][j] < minVal){
                r=i; c=j;
                minVal = data[i][j];
                prevAlloc = getAllocations(i, j);
                prevRemai = getRemaint(i, j);
            }
            else if(data[i][j] == minVal){
                if(prevAlloc < getAllocations(i, j)){
                    r=i; c=j;
                    minVal = data[i][j];
                    prevAlloc = getAllocations(i, j); 
                    prevRemai = getRemaint(i, j);
                }
                else if (prevAlloc == getAllocations(i, j)){
                    if(getRemaint(i, j)<prevRemai){
                        r=i; c=j;
                        minVal = data[i][j];
                        prevAlloc = getAllocations(i, j); 
                        prevRemai = getRemaint(i, j);
                    }
                }
            }
        }
    }

    coordinates[0]=r;
    coordinates[1]=c;
    delete i;
    delete j;
    return coordinates;
}

function leastCostMethod(){
    while(!isFinished()){
        pos = LCMCell();
        r = pos[0]; 
        c= pos[1];
        operation(r, c);
        display();
    }
}

// ---------------------Minima--------------------------------------

function getColMinima(c){ //return the pos of the least element in the column
    minVal = 10000;
    r = 0;
    prevAlloc=0;
    preRemain=0;
    for(i=0; i<row-1; i++){
        if(data[i][c] == -1) continue;

        if(data[i][c]<minVal){
            minVal = data[i][c];
            prevAlloc = getAllocations(i, c);
            preRemain = getRemaint(i, c);
            r = i;
        }   
        else if(data[i][c]==minVal){ // select the max Allocations
            if(getAllocations(i, c) > prevAlloc){
                minVal = data[i][c];
                prevAlloc = getAllocations(i, c);
                preRemain = getRemaint(i, c);
                r = i;
            }
            else if(getAllocations(i, c)==prevAlloc){ // if allocations are same select with less remainder
                if(getRemaint(i, c) < preRemain){
                    minVal = data[i][c];
                    prevAlloc = getAllocations(i, c);
                    preRemain = getRemaint(i, c);
                    r = i;
                }
            }
        }
    }

    delete i;
    return r;
}

function getRowMinima(r){// return the pos of the least element ii the row
    minVal = 100000;
    c = 0;
    prevAlloc=0;
    preRemain=0;

    for(i=0; i<col-1; i++){
        if(data[r][i] == -1) continue;

        if(data[r][i]<minVal){
            minVal = data[r][i];
            prevAlloc = getAllocations(r, i);
            preRemain = getRemaint(r, i);
            c = i;
        }   
        else if(data[r][i]==minVal){ 
            if(getAllocations(r, i) > prevAlloc){// select the max Allocations
                minVal = data[r][i];
                prevAlloc = getAllocations(r, i);
                preRemain = getRemaint(r, i);
                c = i;
            }
            else if(getAllocations(r, i)==prevAlloc){ // if allocations are same select with less remainder
                if(getRemaint(r, i) < preRemain){
                    minVal = data[r][i];
                    prevAlloc = getAllocations(r, i);
                    preRemain = getRemaint(r, i);
                    c = i;
                }
            }
        }
    }

    delete i;
    return c;
} 

function columnMinima(){
    for(let i=0; i<col-1; i++){
        while(demand[i] != -1){
            console.log("fuck");
            r = getColMinima(i);
            operation(r, i);
            display();
        }
    }

}   

function rowMinima(){
    for(let i=0; i<row-1; i++){
        while(supply[i] != -1){
            c = getRowMinima(i);
            r = i;
            operation(r, c);
            display();
        }
    } 
}

function showAnswer(){
    toAdd='';
    allocEl.innerHTML += `<h2>Allocations: </h2>`;
    toAdd += `<h4>`;
    for(i=0; i<allocationVec.length; i++){
        pos = allocationVec[i][0];
        allo = allocationVec[i][1];
             
        toAdd += ` X(${pos[0]+1}, ${pos[1]+1}): ${allo} , `;
        if((i+1)%3 == 0) toAdd += `</h4> <h4>`;
    }
    toAdd += `</h4>`;
    allocEl.innerHTML += toAdd;

    allocEl.innerHTML += `<h2>The final answer we get is ${ans}</h2>`;
    ansTextEl.innerHTML += `${ans}`;
}